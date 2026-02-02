import { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { FaPen, FaGlobe, FaSignOutAlt, FaEdit, FaTrash, FaCheckCircle, FaFileAlt, FaLayerGroup } from 'react-icons/fa';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'draft', 'published'
  const { logout, user } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogService.getBlogs(1); 
      if(data.blogs) setBlogs(data.blogs);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  const handleDelete = (id) => toast.info("Delete logic coming in next step!");

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.info("Logged out successfully");
  };

  // Filter Logic
  const filteredBlogs = blogs.filter(blog => {
    if (filter === 'draft') return blog.isPublished === false;
    if (filter === 'published') return blog.isPublished === true;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* 🔹 SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl hidden md:flex sticky top-0 h-screen">
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wider uppercase">Admin Panel</h2>
          <p className="text-gray-500 text-xs mt-1">{user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* Filter Tabs */}
          <button 
            onClick={() => setFilter('all')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${filter === 'all' ? 'bg-gray-800 text-white border-l-4 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
             <FaLayerGroup /> All Posts
          </button>
           <button 
            onClick={() => setFilter('published')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${filter === 'published' ? 'bg-gray-800 text-white border-l-4 border-green-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
             <FaCheckCircle /> Published
          </button>
           <button 
            onClick={() => setFilter('draft')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${filter === 'draft' ? 'bg-gray-800 text-white border-l-4 border-gray-500' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
             <FaFileAlt /> Drafts
          </button>

          <div className="pt-6 border-t border-gray-800 mt-6">
            <Link to="/create-blog" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition">
               <FaPen /> Create New Post
            </Link>
            <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition">
               <FaGlobe /> View Live Site
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
           <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-2 rounded text-sm font-bold transition">
             <FaSignOutAlt /> Logout
           </button>
        </div>
      </aside>

      {/* 🔹 MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {filter === 'all' ? 'All Posts' : filter === 'draft' ? 'Drafts' : 'Published Posts'}
            </h1>
            <Link to="/create-blog" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded shadow-md transition flex items-center gap-2">
               <FaPen size={12}/> New Post
            </Link>
         </div>

         <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
               <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold tracking-wider">
                  <tr>
                     <th className="p-4 border-b">Blog Title</th>
                     <th className="p-4 border-b text-center">Status</th>
                     <th className="p-4 border-b text-center">Date</th>
                     <th className="p-4 border-b text-center">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {filteredBlogs.length === 0 ? (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500 italic">No posts found in this category.</td></tr>
                  ) : (
                      filteredBlogs.map((blog) => (
                         <tr key={blog._id} className="hover:bg-gray-50 transition">
                            <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                            <td className="p-4 text-center">
                               {blog.isPublished ? (
                                   <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Published</span>
                               ) : (
                                   <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-bold">Draft</span>
                               )}
                            </td>
                            <td className="p-4 text-center text-gray-500 text-sm">
                               {new Date(blog.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-center">
                               <div className="flex justify-center gap-4">
                                  <button className="text-blue-500 hover:text-blue-700 transition" title="Edit">
                                     <FaEdit size={18} />
                                  </button>
                                  <button 
                                     onClick={() => handleDelete(blog._id)}
                                     className="text-red-500 hover:text-red-700 transition"
                                     title="Delete"
                                  >
                                     <FaTrash size={18} />
                                  </button>
                               </div>
                            </td>
                         </tr>
                      ))
                  )}
               </tbody>
            </table>
         </div>
      </main>
    </div>
  );
};

export default AdminDashboard;