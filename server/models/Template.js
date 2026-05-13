const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: {
            type: String,
            enum: ['Shayari', 'Birthday', 'Festival', 'Joke', 'Love', 'Motivational', 'Updesh'],
            required: true,
        },
        imageUrl: { type: String, required: true },
        isFree: { type: Boolean, default: true },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Template', templateSchema);
