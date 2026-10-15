import React, { useState } from 'react';
import { createValueImage } from '../../../Api';

const ValueImageAdd = ({ isOpen, onClose, onAdded }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Image is required!');

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      await createValueImage(formData, token);
      onAdded();
      onClose();
    } catch (err) {
      alert('Failed to add image!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Value Image</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setImage(e.target.files[0])}
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
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ValueImageAdd;
