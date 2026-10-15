import React, { useState } from 'react';
import { createBrandMotive } from '../../../Api';

const BrandMotiveAdd = ({ isOpen, onClose, onAdded }) => {
  const [title, setTitle] = useState('');
  const [highlightText, setHighlightText] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !highlightText) {
      return alert('All fields are required!');
    }

    try {
      setLoading(true);
      await createBrandMotive({ title, highlightText }, token);
      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to create Brand Motive.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Brand Motive</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 w-full mb-3 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Highlight Text"
            className="border p-2 w-full mb-3 rounded"
            value={highlightText}
            onChange={(e) => setHighlightText(e.target.value)}
            rows={3}
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
              {loading ? 'Saving...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandMotiveAdd;
