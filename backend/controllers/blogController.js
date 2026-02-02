const asyncHandler = require('../middleware/asyncHandler');
const blogService = require('../services/blogService');

const getAdminPosts = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const data = await blogService.getAllBlogs(page, limit, true);
    res.status(200).json(data);
});

// Create a new blog
const createPost = asyncHandler(async (req, res) => {

    if (!req.user) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const userId = req.user._id;
    
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
    const { page, limit } = req.query;
    
    const isAdminView = false; 

    const data = await blogService.getAllBlogs(page, limit, isAdminView);
    
    res.status(200).json(data);
});

const updatePost = asyncHandler(async (req, res) => {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.status(200).json(blog);
});

const deletePost = asyncHandler(async (req, res) => {
    await blogService.deleteBlog(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
});

module.exports = {
    getAdminPosts,
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
};