import { useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSave, FaPaperPlane } from 'react-icons/fa';

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', category: '', content: '', image: '', isPublished: true });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      if (!file.type.startsWith('image/')) {
        return toast.error('File must be an image (jpg, png, etc).');
      }

      if (file.size > 1024 * 1024) { 
        return toast.error('Image size too large. Max 1MB allowed.');
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
          // Standard upload without compression
          setFormData({ ...formData, image: reader.result }); 
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await blogService.createBlog(formData);
      toast.success(formData.isPublished ? 'Blog Published!' : '📝 Saved to Drafts!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
        {/* Header & Back Button */}
        <div className="flex justify-between items-center mb-6">
            <Link to="/admin/dashboard" className="flex items-center text-gray-500 hover:text-gray-900 font-semibold transition">
            <FaArrowLeft className="mr-2" /> Cancel & Back
            </Link>
            <h2 className="text-gray-400 text-sm uppercase tracking-wide">New Entry</h2>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            {/* Form Header */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Write New Story</h1>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${formData.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {formData.isPublished ? 'Mode: Publishing' : 'Mode: Drafting'}
                </span>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input 
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" 
                        type="text" 
                        required 
                        placeholder="Enter a catchy title..."
                        value={formData.title} 
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Category</label>
                        <input 
                            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" 
                            type="text" 
                            required 
                            placeholder="Technology, Lifestyle..."
                            value={formData.category} 
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Visibility</label>
                        <div className="flex gap-2">
                            <button 
                                type="button" 
                                onClick={() => setFormData({...formData, isPublished: true})} 
                                className={`flex-1 flex items-center justify-center p-3 rounded border font-semibold transition ${formData.isPublished ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <FaPaperPlane className="mr-2" /> Publish Now
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setFormData({...formData, isPublished: false})} 
                                className={`flex-1 flex items-center justify-center p-3 rounded border font-semibold transition ${!formData.isPublished ? 'bg-gray-100 border-gray-500 text-gray-700 ring-1 ring-gray-400' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <FaSave className="mr-2" /> Save Draft
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative group">
                    <input type="file" id="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {formData.image ? (
                        <div className="relative">
                            <img src={formData.image} alt="Preview" className="h-64 mx-auto object-cover rounded shadow-md" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition rounded">
                                <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition">Click to Change Cover</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500 py-8">
                            <p className="font-semibold text-lg">Drop cover image here</p>
                            <p className="text-sm mt-1">or click to upload (Max 1MB)</p>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea 
                        className="w-full p-4 border border-gray-300 rounded-lg h-80 focus:ring-2 focus:ring-blue-500 outline-none text-gray-700 leading-relaxed transition resize-y font-serif text-lg" 
                        required 
                        placeholder="Tell your story..."
                        value={formData.content} 
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                    />
                </div>

                <div className="pt-4 border-t">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full text-white font-bold py-4 rounded-lg shadow-md transition text-lg flex items-center justify-center ${formData.isPublished ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-800'}`}
                    >
                        {loading ? 'Processing...' : (formData.isPublished ? <><FaPaperPlane className="mr-3"/> Publish Article</> : <><FaSave className="mr-3"/> Save as Draft</>)}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default CreateBlog;