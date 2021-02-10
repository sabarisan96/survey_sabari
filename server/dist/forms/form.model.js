import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const formSchema = mongoose.Schema({
    unique_form_name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    description: {
        type: String
    },
    form_active_status: {
        type: String
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

export default mongoose.model('forms', formSchema);