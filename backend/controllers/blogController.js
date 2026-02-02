const asyncHandler = require('../middleware/asyncHandler');
const blogService = require('../services/blogService');

// Admin: Get all posts (published + unpublished)
const getAdminPosts = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const data = await blogService.getAllBlogs(page, limit, true);
    res.status(200).json(data);
});

// Create new post
const createPost = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const { title, content, category, image, isPublished } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const blog = await blogService.createBlog(
        { title, content, category, image, isPublished },
        req.user.id
    );

    res.status(201).json(blog);
});

// Get post by slug
const getPost = asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogBySlug(req.params.slug);
    res.status(200).json(blog);
});

// Public: Get published posts with pagination
const getPosts = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const data = await blogService.getAllBlogs(page, limit, false);
    res.status(200).json(data);
});

// Get post by ID
const getPostById = asyncHandler(async (req, res) => {
    const blog = await blogService.getBlogById(req.params.id);
    res.status(200).json(blog);
});

// Update post
const updatePost = asyncHandler(async (req, res) => {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.status(200).json(blog);
});

// Delete post
const deletePost = asyncHandler(async (req, res) => {
    await blogService.deleteBlog(req.params.id);
    res.status(200).json({ message: 'Blog deleted successfully' });
});

module.exports = {
    getAdminPosts,
    createPost,
    getPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
};
