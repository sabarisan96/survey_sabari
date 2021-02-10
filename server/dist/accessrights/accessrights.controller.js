import accessRightService from './accessrights.service';
import { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Access from './accessrights.model';
// import { devConfig } from '../env/development';

export default {
    async findAccessRightsBasedOnId(req, res) {
        try {
            // validate the request
            const { error, value } = accessRightService.validateSchema(req.body);
            if (error && error.details) {
                // console.log(error);
                return res.status(BAD_REQUEST).json(error);
            }
            // encrypt the user password


            //create new user
            const { id } = req.params;
            const user = await Access.find({ form_id: id });
            return res.json(user);
        } catch (err) {
            // if (err.name === 'MongoError' && err.code === 11000) {
            //     return res.status(INTERNAL_SERVER_ERROR).json("Name Should Be Unique");
            // } else {
            //     return res.status(INTERNAL_SERVER_ERROR).json(err);
            // }
            // console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async addAccessRights(req, res) {
        try {
            // validate the request
            const { error, value } = accessRightService.validateSchema(req.body);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error);
            }
            // encrypt the user password

            //create new user
            const form = await Access.create(value);
            return res.json({ msg: "Access Rights Created Successfully" });
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(INTERNAL_SERVER_ERROR).json("Name Should Be Unique");
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json(err);
            }
            // console.log(err);
            // return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async updateAccessRights(req, res) {
        try {

            var form = {
                form_id: req.body.form_id,
                users: req.body.users
            };
            const { error, value } = accessRightService.validateSchema(form);
            if (error && error.details) {
                return res.status(BAD_REQUEST).json(error);
            }

            Access.findOneAndUpdate({ form_id: req.params.id }, { $set: form }, { new: true, useFindAndModify: false }, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log("Error in Form Update :" + JSON.stringify(err, undefined, 2));
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    }

};