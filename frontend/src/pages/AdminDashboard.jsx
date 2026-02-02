import { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from '../components/Pagination';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    perPage: 10,
  });

  const navigate = useNavigate();

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await blogService.getAdminBlogs(page, 10); // 10 per page
      setBlogs(data?.blogs || []);
      setPagination(data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        perPage: 10,
      });
    } catch {
      toast.error('Failed to load blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deleteBlog(id);
        toast.success('Post deleted');
        fetchBlogs(pagination.currentPage); 
      } catch {
        toast.error('Failed to delete post');
      }
    }
  };

  const handleRowClick = (slug) => {
    navigate(`/admin/view-blog/${slug}`);
  };

  const handleActionClick = (e, action, id) => {
    e.stopPropagation();
    if (action === 'edit') navigate(`/admin/edit-blog/${id}`);
    if (action === 'delete') handleDelete(id);
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'draft') return blog.isPublished === false;
    if (filter === 'published') return blog.isPublished === true;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            {pagination.totalPosts} total posts
          </p>
        </div>

        <div className="flex bg-white p-1 rounded-lg shadow-sm border">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'all'
                ? 'bg-gray-800 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'published'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === 'draft'
                ? 'bg-gray-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Drafts
          </button>
        </div>

        <Link
          to="/create-blog"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow flex items-center gap-2 hover:bg-blue-700 font-medium"
        >
          <FaPen size={12} /> New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="p-4 border-b">Title</th>
              <th className="p-4 border-b text-center">Category</th>
              <th className="p-4 border-b text-center">Status</th>
              <th className="p-4 border-b text-center">Date</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No posts found.
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr
                  key={blog._id}
                  onClick={() => handleRowClick(blog.slug)}
                  className="hover:bg-blue-50 transition cursor-pointer group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt=""
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <span className="font-medium text-gray-800 group-hover:text-blue-600">
                        {blog.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-sm text-gray-600">
                    {blog.category}
                  </td>
                  <td className="p-4 text-center">
                    {blog.isPublished ? (
                      <span className="text-green-700 text-xs font-medium bg-green-100 px-2 py-1 rounded">
                        Published
                      </span>
                    ) : (
                      <span className="text-gray-600 text-xs font-medium bg-gray-200 px-2 py-1 rounded">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center text-gray-500 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={(e) => handleActionClick(e, 'edit', blog._id)}
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={(e) => handleActionClick(e, 'delete', blog._id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminDashboard;