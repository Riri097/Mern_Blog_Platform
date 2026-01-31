const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    content: {
        type: String,
        required: [true, 'Please add content'],
    },
    image: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);