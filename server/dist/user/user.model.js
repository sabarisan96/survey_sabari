import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import mongoosePaginate from 'mongoose-paginate';

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    user_type_id: {
        type: Number,
        required: true
    },
    user_type_desc: {
        type: String
    },
    createdTime: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {

    if (this.isModified('password') || this.isNew) {
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(this.password, salt);

        this.password = hash;
    }
});
userSchema.plugin(mongoosePaginate);
export default mongoose.model('user', userSchema);