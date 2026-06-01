import React, { useState } from 'react';
import { createAwardRecognition } from '../../../Api';
import { toast } from 'react-toastify';

const AwardAdd = ({ isOpen, onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setIcon(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('🚀 SUBMIT CLICKED');
    console.log('TITLE:', title);
    console.log('SUBTITLE:', subtitle);
    console.log('ICON:', icon);

    if (!title || !subtitle) {
      toast.error('Title and Subtitle are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    if (icon) formData.append('icon', icon);

    console.log('📦 FORM DATA READY');

    try {
      setLoading(true);

      const res = await createAwardRecognition(formData, token);

      console.log('✅ CREATE SUCCESS:', res);

      toast.success('Award created successfully!');

      resetForm();
      onAdded();
      onClose();
    } catch (error) {
      console.log('❌ CREATE ERROR:', error.response?.data || error.message);
      toast.error('Failed to create award');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-[400px] rounded shadow-lg">
        <h2 className="text-lg font-bold mb-3">Add Award</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 w-full mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="border p-2 w-full mb-2"
            placeholder="Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwardAdd;
