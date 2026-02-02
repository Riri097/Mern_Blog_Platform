const Blog = require('../models/Blog');
const generateSlug = require('../utils/slugUtils');
const getPagination = require('../utils/paginationUtils');

// Create Blog
const createBlog = async (blogData, userId) => {
    const { title, content, category, image, isPublished } = blogData;

    // Generate slug manually
    const slug = generateSlug(title);

    // Strict slug uniqueness check
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
        throw new Error('Blog with this title already exists. Please change the title.');
    }

    const blog = await Blog.create({
        user: userId,
        title,
        slug,
        category,
        content,
        image: image || "",
        isPublished: isPublished === false ? false : true,
    });

    return blog;
};

// Get Blog by Slug
const getBlogBySlug = async (slug) => {
    const cleanSlug = slug.trim();

    const blog = await Blog.findOne({ slug: cleanSlug })
        .populate('user', 'name email');

    if (!blog) {
        throw new Error('Blog not found');
    }

    return blog;
};

// Get All Blogs with Pagination
const getAllBlogs = async (page, limit, isAdmin = false) => {
    const { skip, limit: perPage, currentPage } = getPagination(page, limit);

    const filter = isAdmin ? {} : { isPublished: true };

    const blogs = await Blog.find(filter)
        .populate('user', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage);

    const total = await Blog.countDocuments(filter);

    return {
        blogs,
        pagination: {
            currentPage,
            perPage,
            totalPosts: total,
            totalPages: Math.ceil(total / perPage),
        },
    };
};

// Get Blog by ID
const getBlogById = async (id) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog not found');
    }
    return blog;
};

// Update Blog
const updateBlog = async (id, blogData) => {
    const blog = await Blog.findByIdAndUpdate(id, blogData, {
        new: true,
        runValidators: true,
    });

    if (!blog) {
        throw new Error('Blog not found');
    }

    return blog;
};

// Delete Blog
const deleteBlog = async (id) => {
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new Error('Blog not found');
    }

    await blog.deleteOne();
    return { message: 'Blog removed' };
};

module.exports = {
    createBlog,
    getBlogBySlug,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
