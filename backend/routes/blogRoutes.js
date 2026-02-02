const express = require('express');
const router = express.Router();
const { getAdminPosts,createPost, getPost, getPosts, updatePost, deletePost  } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const validateImage = require('../middleware/imageValidation');

router.route('/')
    .get(getPosts)
    .post(protect, admin, validateImage, createPost);

router.get('/admin', protect, admin, getAdminPosts); 

router.route('/:slug').get(getPost);

router.route('/id/:id') 
    .put(protect, admin, updatePost)
    .delete(protect, admin, deletePost);


module.exports = router;