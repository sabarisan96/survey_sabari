import Joi from 'joi';
// const Joi = require('joi');
export default {
    validateSchema(body) {
        const schema = Joi.object().keys({
            name: Joi.string().optional(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            user_type_id: Joi.optional(),
            user_type_desc: Joi.string().optional()
        });

        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    }
};