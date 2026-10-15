import React, { useState, useEffect } from 'react';
import { updateBlogMain } from '../../../Api';

const BlogMainEdit = ({ isOpen, onClose, blog, onUpdated }) => {
  const [form, setForm] = useState({
    heading: '',
    heading1: '',
    description: '',
    mainImage: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setForm({ ...blog, mainImage: null });
      setPreview(blog.mainImage);
    }
  }, [blog]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, mainImage: file });
    }
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    Object.keys(form).forEach(
      (key) => form[key] !== null && fd.append(key, form[key])
    );

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await updateBlogMain(blog._id, fd, token);
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Blog Main</h2>

        <input
          name="heading"
          value={form.heading}
          placeholder="Heading"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        <input
          name="heading1"
          value={form.heading1}
          placeholder="Heading1"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          className="border p-2 w-full mb-2 rounded"
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && (
          <img
            src={preview}
            alt=""
            className="w-full h-32 object-cover rounded my-2"
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogMainEdit;
