const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        profilePicUrl: { type: String, default: '' },
        isPremium: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
