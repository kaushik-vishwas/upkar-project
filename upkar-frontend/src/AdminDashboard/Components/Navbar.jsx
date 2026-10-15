import React, { useEffect, useState } from 'react';
import { getAdminProfileApi } from '../../Api';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) return;

        const res = await getAdminProfileApi(token);
        setAdmin(res);
      } catch (error) {
        console.error('Failed to load admin profile');
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="w-full h-16 bg-white shadow flex items-center px-6">
      {/* Right side */}
      <div className="flex-1 flex justify-end items-center gap-3">
        {admin && (
          <div
            onClick={() => navigate('/admin/settings')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={admin.photo || '/avatar.png'}
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border"
            />
            <div className="text-right leading-tight">
              <p className="text-sm font-semibold text-gray-800 hover:text-[#2D5C3A]">
                {admin.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
