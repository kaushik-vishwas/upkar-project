import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { adminResetPasswordApi } from '../../Api';

const AdminResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminResetAllowed')) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    setLoading(true);
    try {
      await adminResetPasswordApi({ newPassword, confirmPassword });
      toast.success('Password updated successfully');
      localStorage.clear();

      setTimeout(() => {
        navigate('/admin-login');
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
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
            <p className="opacity-90 mt-2">Reset Password</p>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">
            Set New Password
          </h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="text-sm font-medium">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg"
                  placeholder="Enter new password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 border rounded-lg"
                  placeholder="Confirm new password"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2D5C3A] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
