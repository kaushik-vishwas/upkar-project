import React, { useState } from 'react';
import { createCertification } from '../../../Api';

const CertificationAdd = ({ isOpen, onClose, onAdded }) => {
  const [heading, setHeading] = useState('');
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!heading || !content || !icon) {
      return alert('Heading, and Icon are required!');
    }

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('content', content);
    formData.append('icon', icon);

    try {
      setLoading(true);
      await createCertification(formData, token);
      onAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to create certification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Certification</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Heading"
            className="border p-2 w-full mb-3 rounded"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="border p-2 w-full mb-3 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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

export default CertificationAdd;
