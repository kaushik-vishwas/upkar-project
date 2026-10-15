import React, { useState } from 'react';
import { createProjectMain } from '../../../Api';
import { toast } from 'react-toastify';

const ProjectMainAdd = ({ isOpen, onClose, onProjectAdded }) => {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [mainImages, setMainImages] = useState([null, null, null]);
  const [customerHeading, setCustomerHeading] = useState('');
  const [customerDescription, setCustomerDescription] = useState('');
  const [ratingText, setRatingText] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleFileChange = (index, file) => {
    const newFiles = [...mainImages];
    newFiles[index] = file;
    setMainImages(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !description || mainImages.some((f) => !f)) {
      return toast.error('All main images and fields are required!');
    }

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('description', description);
    mainImages.forEach((img) => formData.append('mainImages', img));
    formData.append('customerHeading', customerHeading);
    formData.append('customerDescription', customerDescription);
    formData.append('ratingText', ratingText);

    try {
      setLoading(true);
      await createProjectMain(formData, token);
      toast.success('Project created successfully!');
      onProjectAdded();
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Heading"
            className="border p-2 w-full rounded"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label className="font-medium">Main Images (3)</label>
            {mainImages.map((_, i) => (
              <input
                key={i}
                type="file"
                accept="image/*"
                className="rounded"
                onChange={(e) => handleFileChange(i, e.target.files[0])}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Customer Heading"
            className="border p-2 w-full rounded"
            value={customerHeading}
            onChange={(e) => setCustomerHeading(e.target.value)}
          />
          <textarea
            placeholder="Customer Description"
            className="border p-2 w-full rounded"
            rows={2}
            value={customerDescription}
            onChange={(e) => setCustomerDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Rating Text"
            className="border p-2 w-full rounded"
            value={ratingText}
            onChange={(e) => setRatingText(e.target.value)}
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Uploading...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectMainAdd;
