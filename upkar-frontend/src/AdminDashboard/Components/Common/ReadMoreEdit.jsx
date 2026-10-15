import React, { useState, useEffect } from 'react';
import { updateReadMore } from '../../../Api';

const ReadMoreEdit = ({ isOpen, onClose, readMore, onUpdated }) => {
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [heading, setHeading] = useState('');

  useEffect(() => {
    if (readMore) {
      setHeading(readMore.heading);
      setDescription(readMore.description);
      setPreview(readMore.mainImage);
      setMainImage(null);
    }
  }, [readMore]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!heading || !description)
      return alert('Heading and Description are required!');

    const fd = new FormData();
    fd.append('heading', heading);
    fd.append('description', description);
    if (mainImage) fd.append('mainImage', mainImage);

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await updateReadMore(readMore._id, fd, token);
      if (res.success) {
        onUpdated();
        onClose();
      } else alert(res.message || 'Failed to update ReadMore');
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit ReadMore</h2>
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
            onChange={(e) => {
              setMainImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-full h-32 object-cover rounded my-2"
            />
          )}
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadMoreEdit;
