import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateWhyJoinAPI } from '../../../Api';

const WhyJoinEdit = ({ isOpen, onClose, data, refresh }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setForm({ title: data.title, description: data.description });
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast.error('Title and Description are required');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      await updateWhyJoinAPI(data._id, form, token);
      toast.success('Why Join Us updated successfully!');
      refresh();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Update failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Why Join Us</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-3"
          rows={4}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinEdit;
