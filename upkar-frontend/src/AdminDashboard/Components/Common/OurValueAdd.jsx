import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createOurValue } from '../../../Api';

const OurValueAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({ title: '', iconImage: null });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) =>
    setForm({ ...form, iconImage: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.iconImage)
      return toast.error('All fields are required!');

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    try {
      setLoading(true);
      await createOurValue(fd, token);
      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add value.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Our Value</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            className="border p-2 rounded"
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OurValueAdd;
