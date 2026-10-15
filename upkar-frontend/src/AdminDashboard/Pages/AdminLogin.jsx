import React, { useState, useEffect } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLoginApi } from '../../Api';

const AdminLogin = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) navigate('/admin');
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminLoginApi({ name, password });
      localStorage.setItem('adminToken', res.token);

      toast.success('Successfully logged in!');
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-figtree p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl grid md:grid-cols-2">
        {/* Left */}
        <div className="bg-[#2D5C3A] flex items-center justify-center text-white p-8">
          <div className="text-center">
            <User className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Upkar Admin</h2>
            <p className="opacity-90 mt-2">Secure Admin Access</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="text-sm font-medium">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 py-3 border rounded-lg"
                  placeholder="Enter your admin name"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg"
                  placeholder="Enter your password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D5C3A] text-white py-3 rounded-lg font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
