import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createWhyJoinAPI } from '../../../Api';

const WhyJoinAdd = ({ isOpen, onClose, refresh }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);

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

      await createWhyJoinAPI(form, token);
      toast.success('Why Join Us added successfully!');
      refresh();
      onClose();
      setForm({ title: '', description: '' });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add Why Join Us');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Why Join Us</h2>

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
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinAdd;
