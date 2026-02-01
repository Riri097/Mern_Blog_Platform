const express = require('express');
const router = express.Router();
const { createPost, getPost, getPosts } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const validateImage = require('../middleware/imageValidation');

router.route('/')
    .get(getPosts) 
    .post(protect, admin, validateImage, createPost);

router.route('/:slug').get(getPost);

module.exports = router;