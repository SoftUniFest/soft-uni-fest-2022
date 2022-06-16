import pkg from 'mongoose';

const { Schema, model } = pkg;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true,
    },
    firebaseId: {
        type: String,
        default: '',
    },
    fullName: {
        type: String,
        required: [true, 'Please provide a full name'],
    },
    image: {
        type: String,
        default: '',
    },
});

export default model('User', UserSchema);
