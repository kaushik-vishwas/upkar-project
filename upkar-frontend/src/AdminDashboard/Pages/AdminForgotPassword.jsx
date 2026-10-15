import { useState } from 'react';
import { Mail, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminForgotPasswordApi } from '../../Api';

const AdminForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminForgotPasswordApi({ email });
      localStorage.setItem('adminEmail', email);

      toast.success('OTP sent! Check your email.');
      setTimeout(() => {
        navigate('/admin-otp');
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center font-figtree justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl grid md:grid-cols-2">
        <div className="bg-[#2D5C3A] flex items-center justify-center text-white p-8">
          <div className="text-center">
            <User className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Upkar Admin</h2>
            <p className="opacity-90 mt-2">Password Recovery</p>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Forgot Password
          </h2>

          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-lg"
                  placeholder="Admin email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D5C3A] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
