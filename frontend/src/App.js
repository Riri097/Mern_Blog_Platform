import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, logout, loading } = useAuth();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header user={user} logout={logout} />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<h1 className="text-3xl text-center">Welcome to the Blog</h1>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;