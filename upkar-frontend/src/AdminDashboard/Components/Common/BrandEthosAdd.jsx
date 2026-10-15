import React, { useState } from 'react';
import { createBrandEthos } from '../../../Api';

const BrandEthosAdd = ({ isOpen, onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !icon) {
      return alert('All fields are required!');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('icon', icon);

    try {
      setLoading(true);
      await createBrandEthos(formData, token);
      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to create Brand Ethos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Brand Ethos</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mb-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <input
            type="file"
            accept="image/*"
            className="mb-3"
            onChange={(e) => setIcon(e.target.files[0])}
          />

          <div className="flex justify-end gap-2">
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

export default BrandEthosAdd;
