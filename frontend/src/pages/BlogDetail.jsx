import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import blogService from '../services/blogService';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlogBySlug(slug);
        setBlog(data);
      } catch {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Blog not found.</p>
        <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-3xl mx-auto px-6 pt-8">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Blogs
        </button>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-8">

        <span className="text-sm text-blue-600 font-medium">
          {blog.category}
        </span>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
          {blog.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>{blog.user?.name || 'Author'}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}</span>
        </div>

        {blog.image && (
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
          {blog.content}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;