const asyncHandler = require('../middleware/asyncHandler');
const blogService = require('../services/blogService');

// Create a new blog
const createPost = asyncHandler(async (req, res) => {
    
    const userId = req.user ? req.user.id : req.body.userId; 
    
    const blog = await blogService.createBlog(req.body, userId);
    res.status(201).json(blog);
});

// Get single blog by slug
const getPost = asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    res.status(200).json(blog);
});

// Get all blogs
const getPosts = asyncHandler(async (req, res) => {
    const blogs = await blogService.getAllBlogs();
    res.status(200).json(blogs);
});

module.exports = {
    createPost,
    getPost,
    getPosts,
};