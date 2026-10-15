import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createOngoingProject } from '../../../Api';

const OngoingProjectAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    heading: '',
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
    if (!form.heading || !form.description || !form.mainImage) {
      return toast.error('All fields are required!');
    }

    const fd = new FormData();
    fd.append('heading', form.heading);
    fd.append('description', form.description);
    fd.append('mainImage', form.mainImage);

    const token = localStorage.getItem('adminToken');

    try {
      setLoading(true);
      const res = await createOngoingProject(fd, token);
      if (res.success) {
        toast.success('Project added successfully!');
        onAdded();
        onClose();
        setForm({ heading: '', description: '', mainImage: null });
      } else {
        toast.error(res.message || 'Failed to add project');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Ongoing Project</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="heading"
            placeholder="Heading"
            className="border p-2 rounded"
            value={form.heading}
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

export default OngoingProjectAdd;
