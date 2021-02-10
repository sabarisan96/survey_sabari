const Joi = require('joi');
module.exports = {
    validateSchema(body) {
        const schema = Joi.object().keys({
            unique_form_name: Joi.string().required(),
            form_active_status: Joi.required(),
            form_public_link: Joi.required(),
            description: Joi.string().required(),
            theme: {
                bgColor: Joi.string(),
                textColor: Joi.string(),
                bannerImage: ""
            },
            attributes: Joi.array(),
        });

        const { error, value } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error };
        }
        return { value };
    },
}

