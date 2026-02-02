import { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
        const data = await blogService.getBlogs(page);
        if(data && data.blogs) {
            setBlogs(data.blogs);
            setTotalPages(data.pagination.totalPages);
        } else { setBlogs([]); }
    } 
    catch (err) { setBlogs([]); }
    finally { setLoading(false); }
  };

  const handleReadMore = (slug) => {
    if (!user) {
      toast.error('You must be logged in to read full articles!');
      navigate('/login');
    } else {
      navigate(`/blog/${slug}`);
    }
  };
  if (loading) return <div className="text-center mt-10">Loading blogs...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              {blog.image && (
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded mb-4" />
              )}
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-4">
                By {blog.user?.name} | {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mb-4">{blog.content.substring(0, 150)}...</p>
              
              <button 
                onClick={() => handleReadMore(blog.slug)}
                className="mt-auto self-start text-blue-600 font-bold hover:underline"
              >
                Read More →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Manual Pagination Controls */}
      <div className="flex justify-center mt-8 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 font-bold">Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;