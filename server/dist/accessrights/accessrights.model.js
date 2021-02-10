import mongoose from 'mongoose';
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

export default mongoose.model('user_access_rights', accessRightsSchema);