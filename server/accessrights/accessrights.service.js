const Joi = require('joi');
module.exports = {
    validateSchema(body) {
        const schema = Joi.object().keys({
            form_id: Joi.string().required().optional(),
            users: Joi.array().optional(),
        });

        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
}