import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminLayout from './components/AdminLayout';
import CreateBlog from './pages/CreateBlog';
import SingleBlog from './pages/BlogDetail';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './hooks/useAuth';
import EditBlog from './pages/EditBlog';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/create-blog';
  const { user, logout } = useAuth();

  return (
    <>
      {!isAdminRoute && <Header user={user} logout={logout} />}
      {children}
    </>
  );
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-xl font-semibold text-gray-600">Loading App...</div>
       </div>
     );
  }
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-10">
        <ToastContainer position="bottom-right" autoClose={3000} />
        
        <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/blog/:slug" element={<SingleBlog />} />
              
              {/* Admin Routes */}
               {user && user.role === 'admin' ? (
                 <Route element={<AdminLayout />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/create-blog" element={<CreateBlog />} />
                    <Route path="/admin/edit-blog/:id" element={<EditBlog />} />

                    <Route path="/admin/view-blog/:slug" element={<SingleBlog />} /> 
                 </Route>
              ) : (
                 <Route path="/admin/*" element={<Navigate to="/" />} />
              )}
            </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;