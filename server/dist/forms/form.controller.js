import formService from './form.service';
import { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Form from './form.model';
import DynamicForm from './formDataDynamic.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// import { devConfig } from '../env/development';

export default {
    // Create New Master
    async newMasterForm(req, res, next) {
        // console.log(req.body);
        try {
            // validate the request
            const { error, value } = formService.validateSchema(req.body);
            if (error && error.details) {
                // console.log(error);
                return res.status(BAD_REQUEST).json(error);
            }
            // encrypt the user password


            //create new user
            const form = await Form.create(value);
            return res.json({ msg: "Form Created Successfully" });
        } catch (err) {
            // console.log(err);
            // next(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(INTERNAL_SERVER_ERROR).json("Name Should Be Unique");
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json(err);
            }
        }
    },

    // Find All forms
    async findAllForms(req, res) {
        try {
            const { page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
            const options = {
                page: parseInt(page, 10),
                limit: parseInt(perPage, 10)
            };
            const query = {};
            if (filter) {
                query.unique_form_name = {
                    $regex: filter
                };
            }
            if (sortField && sortDir) {
                options.sort = {
                    [sortField]: sortDir
                };
            }

            const user = await Form.paginate(query, options);
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Find Single form By Id
    async findSingleForm(req, res) {
        try {
            const { id } = req.params;
            const user = await Form.findById(id);
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Find Delete form By Id
    async deleteSingleForm(req, res) {
        try {
            const { id } = req.params;
            const user = await Form.findByIdAndDelete(id);
            return res.json({ msg: "Removed Successfully", id: id });
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Update form By Id
    async UpdateForm(req, res) {
        try {
            var form = {
                name: req.body.name,
                description: req.body.description,
                theme: req.body.theme,
                attributes: req.body.attributes
            };

            Form.findOneAndUpdate({ _id: req.params.id }, { $set: form }, { new: true, useFindAndModify: false }, (err, doc) => {
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
    },

    // Update form data
    async updateFormStatus(req, res) {
        try {
            var form = {
                form_active_status: req.body.form_active_status
            };

            Form.findOneAndUpdate({ _id: req.params.id }, { $set: form }, { new: true, useFindAndModify: false }, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log("Error in Form Update :" + JSON.stringify(err, undefined, 2));
                }
            });
        } catch (err) { }
    },

    // Inserting Form Data
    async insertFormData(req, res) {
        // var collection_name = req.body.data.unique_form_name;
        // res.json(collection_name);
        try {
            const form = await DynamicForm.create(req.body);
            return res.json({ msg: "Data Inserted Successfully" });
        } catch (err) {
            // console.log(err);
            // next(err);
            if (err.name === 'MongoError' && err.code === 11000) {
                return res.status(INTERNAL_SERVER_ERROR).json("Name Should Be Unique");
            } else {
                return res.status(INTERNAL_SERVER_ERROR).json(err);
            }
        }
    },

    async findFormData(req, res) {
        try {
            const { id } = req.params;
            const form = await DynamicForm.find({ form_id: id });
            return res.json(form);
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    // Find form Data Single
    async findFormDataSingle(req, res) {
        // console.log(req.params);
        try {
            const { id } = req.params;
            const form = await DynamicForm.findById(id);
            console.log(form);
            return res.json(form);
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },


    async deleteSingleData(req, res) {
        try {
            const { id } = req.params;
            const user = await DynamicForm.findByIdAndDelete(id);
            return res.json({ msg: "Removed Successfully", id: id });
        } catch (err) {
            console.log(err);
            return res.status(INTERNAL_SERVER_ERROR).json(err);
        }
    },

    async updateSingleData(req, res) {
        try {
            var form = {
                form_id: req.body.data._id,
                data: req.body.data
            };

            DynamicForm.findOneAndUpdate({ _id: req.params.id }, { $set: form }, { new: true, useFindAndModify: false }, (err, doc) => {
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