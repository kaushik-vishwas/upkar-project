import React, { useState, useEffect } from 'react';

const CareerImagesEdit = ({ isOpen, onClose, project, onUpdate }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (project) setFiles(project.images || []);
  }, [project]);

  if (!isOpen) return null;

  const handleFileChange = (e) => setFiles([...e.target.files]);

  const handleSubmit = () => {
    if (files.length === 0) return;
    onUpdate({ images: files });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 overflow-auto pt-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg my-6">
        <h2 className="text-xl font-semibold mb-4">Edit Career Images</h2>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 w-full rounded mb-4"
        />
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerImagesEdit;
