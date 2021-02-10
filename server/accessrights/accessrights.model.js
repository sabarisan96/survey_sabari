const mongoose = require('mongoose');
// import mongoosePaginate from 'mongoose-paginate';

const accessRightsSchema = mongoose.Schema({
    form_id: {
        type: String,
        required: true,
        unique: true
    },
    users: [],
    createdTime: {
        type: Date,
        default: Date.now
    }
});

// accessRightsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('user_access_rights', accessRightsSchema);