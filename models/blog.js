const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    conclusion: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    reviewed: {
        type: String,
        default: "false"
    },
    winner: {
        type: String,
        default: "false"
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
