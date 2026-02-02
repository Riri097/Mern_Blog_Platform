import { useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: '', category: '', content: '', image: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Convert File to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB Limit
        setError('Image size too large. Max 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setError('');
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await blogService.createBlog(formData);
      navigate('/'); // Redirect home after create
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white shadow-lg rounded">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      {error && <p className="text-red-500 mb-4 bg-red-50 p-2 rounded">{error}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Category</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Content</label>
          <textarea
            className="w-full p-2 border rounded h-32"
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Cover Image (Max 1MB)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-4 h-32 object-cover rounded" />}
        </div>

        <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;