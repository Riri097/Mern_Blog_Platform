import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/SingleBlog';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './hooks/useAuth';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/admin') || location.pathname === '/create-blog';
  const { user, logout } = useAuth(); 
  
  return (
    <>
      {!hideHeader && <Header user={user} logout={logout} />}
      {children}
    </>
  );
};

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-10">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
              
              {/* Admin Routes */}
              <Route 
                path="/create-blog" 
                element={user && user.role === 'admin' ? <CreateBlog /> : <Navigate to="/" />} 
              />
              <Route 
                path="/admin/dashboard" 
                element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
              />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;