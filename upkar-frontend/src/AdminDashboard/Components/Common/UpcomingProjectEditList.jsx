import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateUpcomingProjectList } from '../../../Api';

const UpcomingProjectEdit = ({ isOpen, onClose, project, onUpdated }) => {
  const [form, setForm] = useState({
    heading: '',
    type: '',
    location: '',
    projectImage: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (project) {
      setForm({
        heading: project.heading,
        type: project.type,
        location: project.location,
        projectImage: null,
      });
      setPreview(project.projectImage);
    }
  }, [project]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setForm({ ...form, projectImage: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.heading || !form.type || !form.location)
      return toast.error('Heading, Type, and Location are required!');

    const fd = new FormData();
    fd.append('heading', form.heading);
    fd.append('type', form.type);
    fd.append('location', form.location);
    if (form.projectImage) fd.append('projectImage', form.projectImage);

    try {
      setLoading(true);
      await updateUpcomingProjectList(project._id, fd, token);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Upcoming Project</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            name="heading"
            placeholder="Heading"
            className="border p-2 rounded"
            value={form.heading}
            onChange={handleChange}
          />
          <input
            name="type"
            placeholder="Type"
            className="border p-2 rounded"
            value={form.type}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Location"
            className="border p-2 rounded"
            value={form.location}
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpcomingProjectEdit;
