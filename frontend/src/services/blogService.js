import api from './api';

const getBlogs = async (page = 1) => {
    const response = await api.get(`/blogs?page=${page}&limit=5`);
    return response.data;
};

const createBlog = async (blogData) => {
    const response = await api.post('/blogs', blogData);
    return response.data;
};

const getBlogBySlug = async (slug) => {
    const response = await api.get(`/blogs/${slug}`);
    return response.data;
};

const blogService = { getBlogs, createBlog, getBlogBySlug };
export default blogService;