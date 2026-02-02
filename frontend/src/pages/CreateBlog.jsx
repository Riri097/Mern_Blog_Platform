import { useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { FaLayerGroup, FaGlobe, FaSignOutAlt, FaPaperPlane, FaSave } from 'react-icons/fa';

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', category: '', content: '', image: '', isPublished: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) return toast.error('Image size too large. Max 1MB.');
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogService.createBlog(formData);
      toast.success(formData.isPublished ? 'Blog Published!' : 'Saved to Drafts!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* 🔹 SIDEBAR (Consistent with AdminDashboard) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl hidden md:flex sticky top-0 h-screen">
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wider uppercase">Admin Panel</h2>
          <p className="text-gray-500 text-xs mt-1">{user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           {/* Navigation Links */}
           <Link 
            to="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition"
          >
             <FaLayerGroup /> All Posts
          </Link>
           
           <div className="pt-6 border-t border-gray-800 mt-6">
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
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                {formData.isPublished ? 'Publish New Post' : 'Save Draft'}
                </h1>
                
                {/* Visual Status Indicator */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${formData.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                    {formData.isPublished ? 'Mode: Publishing' : 'Mode: Drafting'}
                </span>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Title */}
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
                    type="text"
                    required
                    placeholder="Enter a captivating title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Grid for Category & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Category</label>
                        <input
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition"
                        type="text"
                        required
                        placeholder="Technology, Life, etc."
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                    
                    {/* Clean Toggle */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Post Status</label>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, isPublished: true})} 
                                className={`flex-1 flex items-center justify-center p-3 rounded border font-semibold transition ${formData.isPublished ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <FaPaperPlane className="mr-2" /> Publish
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({...formData, isPublished: false})} 
                                className={`flex-1 flex items-center justify-center p-3 rounded border font-semibold transition ${!formData.isPublished ? 'bg-gray-100 border-gray-500 text-gray-700 ring-1 ring-gray-400' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <FaSave className="mr-2" /> Draft
                            </button>
                        </div>
                    </div>
                </div>

                {/* Image Input */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative group">
                    <input type="file" id="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {formData.image ? (
                        <div className="relative">
                            <img src={formData.image} alt="Preview" className="h-48 mx-auto object-cover rounded shadow-sm" />
                            <p className="text-xs text-center mt-2 text-blue-500">Click to replace</p>
                        </div>
                    ) : (
                        <div className="text-gray-500">
                            <p className="font-semibold text-lg">Drop cover image here</p>
                            <p className="text-xs mt-1">or click to upload (Max 1MB)</p>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg h-60 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 leading-relaxed transition"
                    required
                    placeholder="Tell your story..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition transform active:scale-[0.99] flex items-center justify-center text-lg ${formData.isPublished ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-800'}`}
                    >
                        {loading ? 'Processing...' : (formData.isPublished ? <><FaPaperPlane className="mr-3"/> Publish Article</> : <><FaSave className="mr-3"/> Save as Draft</>)}
                    </button>
                </div>
                </form>
            </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBlog;