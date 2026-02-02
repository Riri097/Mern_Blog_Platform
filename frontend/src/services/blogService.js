import api from './api';

const getAdminBlogs = async () => {
    const response = await api.get(`/blogs/admin?page=1&limit=500&t=${new Date().getTime()}`); 
    return response.data;
};

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

const deleteBlog = async (id) => {
    const response = await api.delete(`/blogs/id/${id}`);
    return response.data;
};

const updateBlog = async (id, blogData) => {
    const response = await api.put(`/blogs/id/${id}`, blogData);
    return response.data;
};

const blogService = { getAdminBlogs, getBlogs, createBlog, getBlogBySlug, deleteBlog, updateBlog };
export default blogService;