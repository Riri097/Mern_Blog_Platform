import { Link } from 'react-router-dom';
const Header = ({ user, logout }) => {
  return (
    <header className="bg-gray-900 text-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">MERN Blog</Link>
        <nav>
          {user ? (
            <div className="flex items-center gap-6">
              <span className="text-gray-300 hidden md:block">Hello, {user.name}</span>
              
              {/* Added Dashboard Link for Admin */}
              {user.role === 'admin' && (
                <Link to="/admin/dashboard" className="hover:text-yellow-400 font-bold">
                  Dashboard
                </Link>
              )}
              
              <button 
                onClick={logout} 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm transition"
              >
                Logout
             </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;