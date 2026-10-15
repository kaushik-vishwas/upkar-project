import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createReadMore } from '../../../Api';

const ReadMoreAdd = ({ isOpen, onClose, onAdded }) => {
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !description || !mainImage) {
      toast.error('Description and Image are required!');
      return;
    }

    const fd = new FormData();
    fd.append('heading', heading);
    fd.append('description', description);
    fd.append('mainImage', mainImage);

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await createReadMore(fd, token);
      if (res.success) {
        toast.success('ReadMore added successfully!');
        onAdded();
        onClose();
        setHeading('');
        setDescription('');
        setMainImage(null);
      } else toast.error(res.message || 'Failed to add ReadMore');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add ReadMore</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Heading"
            className="border p-2 rounded"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setMainImage(e.target.files[0])}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadMoreAdd;
