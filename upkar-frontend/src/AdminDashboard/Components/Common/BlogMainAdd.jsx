import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createBlogMain } from '../../../Api';

const BlogMainAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    heading: '',
    heading1: '',
    description: '',
    mainImage: null,
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) =>
    setForm({ ...form, mainImage: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.heading ||
      !form.heading1 ||
      !form.description ||
      !form.mainImage
    ) {
      toast.error('All fields are required!');
      return;
    }

    const fd = new FormData();
    fd.append('heading', form.heading);
    fd.append('heading1', form.heading1);
    fd.append('description', form.description);
    fd.append('mainImage', form.mainImage);

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await createBlogMain(fd, token);
      if (res.success) {
        onAdded();
        toast.success('Blog added successfully!');
        onClose();
        setForm({
          heading: '',
          heading1: '',
          description: '',
          mainImage: null,
        });
      } else toast.error(res.message || 'Failed to add blog');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Blog Main</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="heading"
            placeholder="Heading"
            className="border p-2 rounded"
            value={form.heading}
            onChange={handleChange}
          />
          <input
            name="heading1"
            placeholder="Heading1"
            className="border p-2 rounded"
            value={form.heading1}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded"
            value={form.description}
            onChange={handleChange}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogMainAdd;
