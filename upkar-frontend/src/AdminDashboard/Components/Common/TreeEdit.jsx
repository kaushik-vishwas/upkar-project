import React, { useState, useEffect } from 'react';
import { editTreeSection } from '../../../Api';

const TreeSectionEdit = ({ isOpen, onClose, section, onUpdated }) => {
  const [form, setForm] = useState({
    heading1: '',
    heading2: '',
    description: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (section) {
      setForm({
        heading1: section.heading1,
        heading2: section.heading2,
        description: section.description,
        image: null,
      });
      setImagePreview(section.image);
    }
  }, [section]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('heading1', form.heading1);
      formData.append('heading2', form.heading2);
      formData.append('description', form.description);
      if (form.image) formData.append('image', form.image);

      await editTreeSection(section._id, formData, token);
      onUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Tree Section</h2>

        <input
          name="heading1"
          value={form.heading1}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Heading1"
        />
        <input
          name="heading2"
          value={form.heading2}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Heading2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3 rounded"
          placeholder="Description"
        />

        <label className="block mb-2 font-medium text-sm text-gray-700">
          Image
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
          <button onClick={onClose} className="px-4 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-1 bg-green-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TreeSectionEdit;
