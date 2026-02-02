import { useState, useEffect } from 'react';
import blogService from '../services/blogService';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft, FaSave, FaPaperPlane } from 'react-icons/fa';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({ 
    title: '', 
    category: '', 
    content: '', 
    image: '', 
    isPublished: true 
  });

  useEffect(() => {
    const fetchToEdit = async () => {
      try {
        const data = await blogService.getBlogById(id);
        if (data) {
            setFormData({
                title: data.title || '',
                category: data.category || '',
                content: data.content || '',
                image: data.image || '',
                isPublished: data.isPublished !== undefined ? data.isPublished : true 
            });
        }
      } catch (error) {
        toast.error("Could not load blog.");
        navigate('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchToEdit();
  }, [id, navigate]);

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
    try {
      await blogService.updateBlog(id, formData);
      toast.success('Updated successfully');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="p-10 text-center text-xl font-bold text-gray-500">Loading Editor...</div>;

  return (
    <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
             <Link to="/admin/dashboard" className="flex items-center text-gray-500 hover:text-gray-900 font-bold transition">
                <FaArrowLeft className="mr-2" /> Back to Dashboard
             </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">✏️ Edit Post</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input 
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none transition" 
                        type="text" 
                        required
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
                            value={formData.category} 
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
                        />
                    </div>
                     <div>
                        <label className="block text-gray-700 font-bold mb-2">Visibility</label>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setFormData({...formData, isPublished: true})} className={`flex-1 p-3 rounded border font-bold transition ${formData.isPublished ? 'bg-green-100 text-green-700 border-green-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FaPaperPlane className="inline mr-2" /> Publish</button>
                            <button type="button" onClick={() => setFormData({...formData, isPublished: false})} className={`flex-1 p-3 rounded border font-bold transition ${!formData.isPublished ? 'bg-gray-100 text-gray-700 border-gray-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}><FaSave className="inline mr-2" /> Draft</button>
                        </div>
                     </div>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition relative group">
                    <input type="file" onChange={handleImageChange} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {formData.image ? (
                         <div className="relative">
                            <img src={formData.image} alt="Preview" className="h-64 mx-auto object-cover rounded shadow-sm" />
                            <p className="text-xs text-center mt-2 text-blue-500 font-bold">Click to Change Image</p>
                         </div>
                    ) : (
                        <div className="text-gray-500 py-4"><p className="font-semibold text-lg">Click to update cover image</p></div>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-bold mb-2">Content</label>
                    <textarea 
                        className="w-full p-4 border border-gray-300 rounded-lg h-80 focus:ring-2 focus:ring-blue-500 outline-none font-serif text-lg leading-relaxed transition" 
                        required
                        value={formData.content} 
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                    />
                </div>

                <div className="pt-4 border-t">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md flex items-center justify-center transition">
                        <FaSave className="mr-3"/> Save Changes
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default EditBlog;