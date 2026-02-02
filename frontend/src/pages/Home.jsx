import { useEffect, useState } from 'react';
import blogService from '../services/blogService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BlogCard from '../components/BlogCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    perPage: 6,
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await blogService.getBlogs(page, 6);
      setBlogs(data?.blogs || []);
      setPagination(data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        perPage: 6,
      });
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(pagination.currentPage);
    // eslint-disable-next-line
  }, []);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    fetchBlogs(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadMore = (slug) => {
    if (!user) return navigate('/login');
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto py-12 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">The Blog</h1>
          <p className="text-gray-600">
            Simple articles on coding, learning, and building projects.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-10 px-6">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No blogs published yet.</p>
        ) : (
          <>

            <div className="text-sm text-gray-500 mb-6">
              Showing {blogs.length} of {pagination.totalPosts} articles
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} onReadMore={handleReadMore} />
              ))}
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </div>
  );
};

export default Home;