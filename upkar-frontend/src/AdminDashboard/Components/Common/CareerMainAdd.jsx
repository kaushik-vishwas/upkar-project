import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createCareerMainAPI } from '../../../Api';

const CareerMainAdd = ({ isOpen, onClose, refresh }) => {
  const [careerDescription, setCareerDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!careerDescription.trim()) {
      toast.error('Career description is required');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');

      await createCareerMainAPI({ careerDescription }, token);

      toast.success('Career Main added successfully!');
      refresh(); // refresh table
      onClose();
      setCareerDescription(''); // clear form
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to add Career Main');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Career Main</h2>

        <textarea
          placeholder="Career Description"
          value={careerDescription}
          onChange={(e) => setCareerDescription(e.target.value)}
          className="border p-2 w-full rounded"
          rows={4}
        />

        <div className="flex justify-end gap-2 mt-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerMainAdd;
