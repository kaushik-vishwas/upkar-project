import React, { useState } from 'react';
import { createTreeSection } from '../../../Api';

const TreeSectionAdd = ({ isOpen, onClose, onAdded }) => {
  const [heading1, setHeading1] = useState('');
  const [heading2, setHeading2] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading1 || !description || !image)
      return alert('Heading1, Description, and Image are required!');

    const formData = new FormData();
    formData.append('heading1', heading1);
    formData.append('heading2', heading2);
    formData.append('description', description);
    formData.append('image', image);

    try {
      setLoading(true);
      await createTreeSection(formData, token);
      onAdded();
      onClose();
    } catch (error) {
      console.error('Error creating section:', error);
      alert('Failed to create section.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Tree Section</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Heading1"
            className="border p-2 w-full mb-3 rounded"
            value={heading1}
            onChange={(e) => setHeading1(e.target.value)}
          />
          <input
            type="text"
            placeholder="Heading2"
            className="border p-2 w-full mb-3 rounded"
            value={heading2}
            onChange={(e) => setHeading2(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 w-full mb-3 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="mb-3"
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
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? 'Uploading...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TreeSectionAdd;
