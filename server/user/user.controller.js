const userService = require("./user.service");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require("http-status-codes");
const User = require('./user.model');
const devConfig = require("../env/development");


module.exports = {
    async signup(req, res) {
        try {

            // validate the reuest 
            const { error, value } = userService.validateSchema(req.body);

            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error)
            }

            // encrypt the user password

            // create ne user
            const user = await User.create(value);
            return res.json({ success: true, message: 'User Created Successfully' });
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(INTERNAL_SERVER_ERROR).json("Email Should Be Unique");
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json(err);
            }
        }
    },

    async login(req, res) {
        try {
            const { error, value } = userService.validateSchema(req.body);

            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error)
            }

            const user = await User.findOne({ email: value.email });
            if (!user) {
                return res.status(BAD_REQUEST).json({ err: 'Invalid email or password' });
            }
            const matched = await bcryptjs.compare(value.password, user.password)
            // res.json(matched);
            if (!matched) {
                return res.status(UNAUTHORIZED).json({ err: 'Invalid Credentails' });
            }
            const token = jwt.sign({ id: user._id }, devConfig.secret, { expiresIn: '1d' });
            // res.json(user._id);
            return res.json({ success: true, token, user_type_id: user.user_type_id });

        } catch (err) {
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async test(req, res) {
        return res.json(req.user);
    },

    async userlist(req, res) {
        try {
            const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(perPage, 10)
            }
            const query = {}
            if (filter) {
                query.email = { $regex: filter }
            }
            if (sortField && sortDir) {
                options.sort = {
                    [sortField]: sortDir,
                };
            }

            const user = await User.paginate(query, options);
            return res.json(user);
        }
        catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },


    async findAllUsers(req, res) {
        try {
            const user = await User.find();
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    }


}