import React, { useState, useEffect } from 'react';
import { updateBrandEthos } from '../../../Api';

const BrandEthosEdit = ({ isOpen, onClose, ethos, onUpdated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [iconPreview, setIconPreview] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (ethos) {
      setTitle(ethos.title || '');
      setDescription(ethos.description || '');
      setIconPreview(ethos.icon || '');
      setIconFile(null);
    }
  }, [ethos]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim())
      return alert('All fields required');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (iconFile) formData.append('icon', iconFile);

    try {
      setLoading(true);
      await updateBrandEthos(ethos._id, formData, token);
      onUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconPreview(URL.createObjectURL(file));
      setIconFile(file);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Brand Ethos</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full mb-3 rounded"
          rows={3}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleIconChange}
          className="mb-3"
        />
        {iconPreview && (
          <img
            src={iconPreview}
            alt="Preview"
            className="w-full h-24 object-cover rounded mb-3"
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandEthosEdit;
