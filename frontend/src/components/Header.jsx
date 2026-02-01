import { Link } from 'react-router-dom';

const Header = ({ user, logout }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MERN Blog</Link>
        
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <Link to="/create-blog" className="bg-green-500 px-3 py-1 rounded">New Post</Link>
              )}
              <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
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