import React, { useState, useEffect } from 'react';
import { editValueImage } from '../../../Api';

const ValueImageEdit = ({ isOpen, onClose, valueImage, onUpdated }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (valueImage) {
      setPreview(valueImage.image);
      setFile(null);
    }
  }, [valueImage]);

  if (!isOpen) return null;

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    if (file) formData.append('image', file);

    await editValueImage(valueImage._id, formData, token);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Value Image</h2>

        <input type="file" accept="image/*" onChange={handleFile} />

        {preview && (
          <img
            src={preview}
            className="w-full h-32 mt-3 rounded object-cover"
          />
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValueImageEdit;
