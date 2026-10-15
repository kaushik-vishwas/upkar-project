import React, { useEffect, useState } from 'react';
import { Camera, Lock, Eye, EyeOff } from 'lucide-react';
import {
  getAdminProfileApi,
  updateAdminProfileApi,
  changeAdminPasswordApi,
} from '../../../Api';
import { toast } from 'react-toastify';
import SettingsImg from '../../../assets/adminProfile.jpg';

const Settings = () => {
  const [admin, setAdmin] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordLoading, setPasswordLoading] = useState(false);
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await getAdminProfileApi(token);

      setAdmin(res);
      setName(res.name || '');
      setEmail(res.email || '');
      setPreview(res.photo || '');
    } catch (error) {
      toast.error('Failed to load profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (photo) formData.append('photo', photo);

      const res = await updateAdminProfileApi(formData, token);
      setAdmin(res.admin);

      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setPasswordLoading(true);
    try {
      const token = localStorage.getItem('adminToken');

      const res = await changeAdminPasswordApi(
        { currentPassword, newPassword, confirmPassword },
        token,
      );

      toast.success(res.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password update failed');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-6xl mx-auto font-figtree">
      <h2 className="text-2xl font-semibold mb-6">Admin Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img src={SettingsImg} alt="Settings" className="rounded-xl" />
        </div>

        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={preview || '/avatar.png'}
                className="w-24 h-24 rounded-full object-cover border"
              />
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-[#2D5C3A] p-2 rounded-full cursor-pointer">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="file" hidden onChange={handlePhotoChange} />
                </label>
              )}
            </div>
            <div>
              <h3 className="font-semibold">{admin.name}</h3>
              <p className="text-sm text-gray-500">{admin.email}</p>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              disabled={!editMode}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Email</label>
            <input
              value={email}
              disabled={!editMode}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg disabled:bg-gray-100"
            />
          </div>

          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-[#2D5C3A] text-white px-6 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={handleUpdateProfile}
                className="bg-[#2D5C3A] text-white px-6 py-2 rounded-lg"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  fetchProfile();
                }}
                className="border px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="text-sm font-medium">Current Password</label>
            <Lock className="absolute left-3 top-8 text-gray-500" />
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg"
            />
            <span
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-8 cursor-pointer text-gray-500"
            >
              {showCurrentPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">New Password</label>
            <Lock className="absolute left-3 top-8 text-gray-500" />
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg"
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-8 cursor-pointer text-gray-500"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          <div className="relative">
            <label className="text-sm font-medium">Confirm Password</label>
            <Lock className="absolute left-3 top-8 text-gray-500" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-8 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>
        </div>

        <button
          onClick={handleChangePassword}
          disabled={passwordLoading}
          className="mt-6 bg-[#2D5C3A] text-white px-6 py-2 rounded-lg"
        >
          {passwordLoading ? 'Updating...' : 'Update Password'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
