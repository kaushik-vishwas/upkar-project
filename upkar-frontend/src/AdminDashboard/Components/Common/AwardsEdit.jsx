import React, { useState, useEffect } from 'react';
import { updateAwardAPI } from '../../../Api';

const AwardsEdit = ({ isOpen, onClose, award, onUpdate }) => {
  const [form, setForm] = useState({ title: '', image: null });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (award) {
      setForm({ title: award.title, image: null });
      setImagePreview(award.image);
    }
  }, [award]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = async () => {
    if (!form.title) return alert('Title is required!');
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('title', form.title);
      if (form.image) formData.append('image', form.image);

      await updateAwardAPI(award._id, formData, token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating award:', error);
      alert('Failed to update award.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Award</h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Title"
        />
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Award Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full mb-3 rounded"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded mb-3"
          />
        )}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwardsEdit;
