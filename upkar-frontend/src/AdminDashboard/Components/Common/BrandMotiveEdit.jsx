import React, { useState, useEffect } from 'react';
import { updateBrandMotive } from '../../../Api';

const BrandMotiveEdit = ({ isOpen, onClose, motive, onUpdated }) => {
  const [title, setTitle] = useState('');
  const [highlightText, setHighlightText] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (motive) {
      setTitle(motive.title || '');
      setHighlightText(motive.highlightText || '');
    }
  }, [motive]);

  if (!isOpen || !motive) return null;

  const handleSubmit = async () => {
    if (!title.trim() || !highlightText.trim()) {
      return alert('All fields are required');
    }

    try {
      setLoading(true);

      await updateBrandMotive(motive._id, { title, highlightText }, token);

      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Brand Motive</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded"
        />

        <textarea
          value={highlightText}
          onChange={(e) => setHighlightText(e.target.value)}
          placeholder="Highlight Text"
          className="border p-2 w-full mb-3 rounded"
          rows={3}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandMotiveEdit;
