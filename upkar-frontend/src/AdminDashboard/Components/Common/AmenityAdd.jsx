import React, { useState } from 'react';
import { createAmenityAPI } from '../../../Api';

const AmenityAdd = ({ isOpen, onClose, refresh }) => {
  const [icon, setIcon] = useState(null);
  const [heading, setHeading] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!heading || !icon) return alert('Heading and icon are required!');

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('icon', icon);

    try {
      setLoading(true);
      await createAmenityAPI(formData, token);
      refresh();
      onClose();
    } catch (error) {
      console.error('Error creating amenity:', error);
      alert('Failed to create amenity.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Amenity</h2>
        <div className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            className="border p-2 rounded"
            onChange={(e) => setIcon(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Heading"
            className="border p-2 rounded"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            {loading ? 'Uploading...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmenityAdd;
