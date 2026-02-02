import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; 
import CreateBlog from './pages/CreateBlog'; 
import SingleBlog from './pages/SingleBlog'; 
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="text-center mt-20 font-bold">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans text-gray-900 pb-10">
        <Header user={user} logout={logout} />
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            <Route 
              path="/create-blog" 
              element={user && user.role === 'admin' ? <CreateBlog /> : <Navigate to="/" />} 
            />
            <Route path="/blog/:slug" element={<SingleBlog />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;