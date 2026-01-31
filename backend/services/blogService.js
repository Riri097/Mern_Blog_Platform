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

const getAllBlogs = async (queryPage, queryLimit) => {
    const page = Number(queryPage) || 1;
    const limit = Number(queryLimit) || 5;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find({})
    .populate('user', 'name email')
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

    const total = await Blog.countDocuments({});

     return {
        blogs,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
            perPage: limit
        }
    };
};

module.exports = {
    createBlog,
    getBlogBySlug,
    getAllBlogs,
};