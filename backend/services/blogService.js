const Blog = require('../models/Blog');
const generateSlug = require('../utils/slugUtils');
const getPagination = require('../utils/paginationUtils'); 

const createBlog = async (blogData, userId) => {
    const { title, content, category, image, isPublished  } = blogData;
    // Generate Slug manually
    let slug = generateSlug(title);

    // Check strict uniqueness (Simple logic: if exists, throw error or append random num)
    // For this task, we will throw an error to keep it strict
    const slugExists = await Blog.findOne({ slug });
    if (slugExists) {
        throw new Error('Blog with this title already exists. Please change the title.');
    }

    const finalIsPublished = isPublished === false ? false : true;
    // Create Blog
    const blog = await Blog.create({
        user: userId,
        title,
        slug,
        category,
        content,
        image: image || "",
        isPublished: finalIsPublished, 
    });
    return blog;
};

const getBlogBySlug = async (slug) => {
    // trimming the slug just in case of whitespace
    const cleanSlug = slug.trim();
    const blog = await Blog.findOne({ slug: cleanSlug }).populate('user', 'name email');
    if (!blog) {
        console.log("Blog not found in DB"); 
        throw new Error('Blog not found');
    }
    return blog;
};

const getAllBlogs = async (page, limit, isAdmin = false) => {
    const { skip, limit: perPage, currentPage } = getPagination(page, limit);

    const filter = isAdmin ? {} : { isPublished: true };

    const blogs = await Blog.find(filter)
        .populate('user', 'name')
        .skip(skip)
        .limit(perPage)
        .sort({ createdAt: -1 });

    const total = await Blog.countDocuments(filter);

    return {
        blogs,
        pagination: {
            currentPage,
            totalPages: Math.ceil(total / perPage),
            totalPosts: total,
            perPage
        }
    };
};

const updateBlog = async (id, blogData) => {
    const blog = await Blog.findByIdAndUpdate(id, blogData, {
        new: true,
        runValidators: true,
    });

    if (!blog) throw new Error('Blog not found');
    return blog;
};

const deleteBlog = async (id) => {
    const blog = await Blog.findById(id);
    if (!blog) throw new Error('Blog not found');
    
    await blog.deleteOne();
    return { message: 'Blog removed' };
};

module.exports = {
    createBlog,
    getBlogBySlug,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};