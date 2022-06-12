// import UserSchema from '../models/User.js';

function createUser(userData) {
    const user = new UserSchema(userData);

    return user.save();
}

function getUserById(id) {
    return UserSchema.findById(id);
}

function updateUser(user) {
    return UserSchema.findOneAndUpdate({ _id: user._id }, user, { new: true });
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await UserSchema.findOne({ email: { $regex: pattern } });
    return user;
}

export default {
    createUser,
    getUserById,
    updateUser,
    getUserByEmail,
};
