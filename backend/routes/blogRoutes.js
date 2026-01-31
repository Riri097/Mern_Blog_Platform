const express = require('express');
const router = express.Router();
const { createPost, getPost, getPosts } = require('../controllers/blogController');

router.route('/').get(getPosts).post(createPost);
router.route('/:slug').get(getPost);

module.exports = router;