import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateOurValue } from '../../../Api';

const OurValueEdit = ({ isOpen, onClose, value, onUpdated }) => {
  const [form, setForm] = useState({ title: '', iconImage: null });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (value) setForm({ title: value.title, iconImage: null });
  }, [value]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) =>
    setForm({ ...form, iconImage: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error('Title is required!');

    const fd = new FormData();
    fd.append('title', form.title);
    if (form.iconImage) fd.append('iconImage', form.iconImage);

    try {
      setLoading(true);
      await updateOurValue(value._id, fd, token);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update value.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Our Value</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            className="border p-2 rounded"
            value={form.title}
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
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded">
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OurValueEdit;
