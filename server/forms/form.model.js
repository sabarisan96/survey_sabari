const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const formSchema = mongoose.Schema({
    unique_form_name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String,
    },
    form_active_status: {
        type: String,
    },
    form_public_link: {
        type: String,
    },
    theme: {
        bgColor: {
            type: String
        },
        textColor: {
            type: String
        },
        bannerImage: {
            type: String
        }
    },
    attributes: [],
    createdTime: {
        type: Date,
        default: Date.now
    }
});

formSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('forms', formSchema);