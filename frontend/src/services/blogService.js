import api from './api';

// Public: Get published blogs with pagination
const getBlogs = async (page = 1, limit = 6) => {
  const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
  return response.data;
};

// Admin: Get all blogs with pagination
const getAdminBlogs = async (page = 1, limit = 10) => {
  const response = await api.get(`/blogs/admin?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single blog by slug
const getBlogBySlug = async (slug) => {
  const response = await api.get(`/blogs/${slug}`);
  return response.data;
};

// Get single blog by ID (for editing)
const getBlogById = async (id) => {
  const response = await api.get(`/blogs/id/${id}`);
  return response.data;
};

// Create blog
const createBlog = async (blogData) => {
  const response = await api.post('/blogs', blogData);
  return response.data;
};

// Update blog
const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/id/${id}`, blogData);
  return response.data;
};

// Delete blog
const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/id/${id}`);
  return response.data;
};

const blogService = {
  getBlogs,
  getAdminBlogs,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;