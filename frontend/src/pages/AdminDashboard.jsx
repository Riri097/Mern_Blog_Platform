
import { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaEdit, FaTrash, } from 'react-icons/fa';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all'); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getAdminBlogs(); 
      if(data.blogs) setBlogs(data.blogs);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await blogService.deleteBlog(id);
        toast.success("Post deleted");
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        toast.error("Failed to delete post");
      }
    }
  };

  // 🔹 KEY CHANGE: Navigate to the INTERNAL admin view route
  const handleRowClick = (slug) => {
    navigate(`/admin/view-blog/${slug}`);
  };

  const handleActionClick = (e, action, id) => {
    e.stopPropagation(); 
    if(action === 'edit') navigate(`/admin/edit-blog/${id}`);
    if(action === 'delete') handleDelete(id);
  };

  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'draft') return blog.isPublished === false;
    if (filter === 'published') return blog.isPublished === true;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto">
         {/* Title Area */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage posts</p>
            </div>
            {/* Filters */}
            <div className="flex bg-white p-1 rounded-lg shadow-sm border">
                <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-md text-sm font-bold ${filter === 'all' ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>All</button>
                <button onClick={() => setFilter('published')} className={`px-4 py-2 rounded-md text-sm font-bold ${filter === 'published' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Published</button>
                <button onClick={() => setFilter('draft')} className={`px-4 py-2 rounded-md text-sm font-bold ${filter === 'draft' ? 'bg-gray-500 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Drafts</button>
            </div>
            <Link to="/create-blog" className="bg-blue-600 text-white px-5 py-2.5 rounded shadow flex items-center gap-2 hover:bg-blue-700 font-bold">
               <FaPen size={12}/> New Post
            </Link>
         </div>

         {/* Table */}
         <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
                  <tr>
                     <th className="p-4 border-b">Title</th>
                     <th className="p-4 border-b text-center">Status</th>
                     <th className="p-4 border-b text-center">Date</th>
                     <th className="p-4 border-b text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {filteredBlogs.map((blog) => (
                     <tr 
                        key={blog._id} 
                        onClick={() => handleRowClick(blog.slug)} // <--- This now opens sidebar view
                        className="hover:bg-blue-50 transition cursor-pointer group"
                     >
                        <td className="p-4 font-medium text-gray-800 group-hover:text-blue-600">{blog.title}</td>
                        <td className="p-4 text-center">
                           {blog.isPublished ? <span className="text-green-600 text-xs font-bold bg-green-100 px-2 py-1 rounded">Published</span> : <span className="text-gray-600 text-xs font-bold bg-gray-200 px-2 py-1 rounded">Draft</span>}
                        </td>
                        <td className="p-4 text-center text-gray-500 text-sm">{new Date(blog.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-center">
                           <div className="flex justify-center gap-4">
                              <button onClick={(e) => handleActionClick(e, 'edit', blog._id)} className="text-blue-500 hover:text-blue-700 p-2"><FaEdit size={18} /></button>
                              <button onClick={(e) => handleActionClick(e, 'delete', blog._id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash size={18} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
    </div>
  );
};

export default AdminDashboard;