const Blog = require('../models/Blog');
const generateSlug = require('../utils/slugUtils');

const createBlog = async (blogData, userId) => {
    const { title, content, category, image } = blogData;

    // Generate Slug manually
    let slug = generateSlug(title);

    // Check strict uniqueness (Simple logic: if exists, throw error or append random num)
    // For this task, we will throw an error to keep it strict
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
        throw new Error('Blog with this title already exists. Please change the title.');
    }

    // Create Blog
    const blog = await Blog.create({
        user: userId,
        title,
        slug,
        category,
        content,
        image
    });
    return blog;
};

const getBlogBySlug = async (slug) => {
    const blog = await Blog.findOne({ slug }).populate('user', 'name email');
    if (!blog) {
        throw new Error('Blog not found');
    }
    return blog;
};

const getAllBlogs = async () => {
    return await Blog.find({}).populate('user', 'name');
};

module.exports = {
    createBlog,
    getBlogBySlug,
    getAllBlogs,
};