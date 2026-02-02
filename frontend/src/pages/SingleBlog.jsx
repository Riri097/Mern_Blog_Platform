import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogService from '../services/blogService';

const SingleBlog = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogBySlug(slug);
        setBlog(data);
      } catch (err) {
        setError('Blog not found');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500 text-xl">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 bg-white shadow-lg mt-10 rounded-lg">
      <Link to="/" className="text-blue-500 mb-4 inline-block hover:underline">← Back to Home</Link>
      
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-96 object-cover rounded mb-6"
        />
      )}
      
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      
      <div className="flex justify-between items-center text-gray-500 text-sm mb-8 border-b pb-4">
        <span>By <span className="font-semibold text-gray-700">{blog.user?.name}</span></span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
        {blog.content}
      </div>
    </div>
  );
};

export default SingleBlog;