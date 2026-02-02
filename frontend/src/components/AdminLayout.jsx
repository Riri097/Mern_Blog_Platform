import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaLayerGroup, FaGlobe, FaSignOutAlt, FaPen } from 'react-icons/fa';

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl sticky top-0 h-screen hidden md:flex">
        <div className="p-6 text-center border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-wider uppercase">Admin Panel</h2>
          <p className="text-gray-500 text-xs mt-1">{user?.name}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <Link 
             to="/admin/dashboard" 
             className={`flex items-center gap-3 px-4 py-3 rounded transition ${isActive('/admin/dashboard') ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
           >
             <FaLayerGroup /> All Posts
          </Link>
           <Link 
             to="/create-blog" 
             className={`flex items-center gap-3 px-4 py-3 rounded transition ${isActive('/create-blog') ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
           >
             <FaPen size={12}/> New Post
          </Link>
           
           <div className="pt-6 border-t border-gray-800 mt-6">
            <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition">
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

      <main className="flex-1 p-8 overflow-y-auto h-screen bg-gray-100">
          <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;