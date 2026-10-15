import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, ShieldCheck } from 'lucide-react';
import { adminVerifyOtpApi } from '../../Api';

const AdminOtpVerify = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('adminEmail')) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await adminVerifyOtpApi({ otp });
      localStorage.setItem('adminResetAllowed', 'true');

      toast.success('OTP verified successfully!');
      setTimeout(() => {
        navigate('/admin-reset-password');
      }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-figtree p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl grid md:grid-cols-2">
        <div className="bg-[#2D5C3A] flex items-center justify-center text-white p-8">
          <div className="text-center">
            <User className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Upkar Admin</h2>
            <p className="opacity-90 mt-2">OTP Verification</p>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6">Verify OTP</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="text-sm font-medium block mb-2 text-center">
                Enter 6-digit OTP
              </label>

              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 py-3 border rounded-lg text-center text-xl tracking-widest"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-[#2D5C3A] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminOtpVerify;
