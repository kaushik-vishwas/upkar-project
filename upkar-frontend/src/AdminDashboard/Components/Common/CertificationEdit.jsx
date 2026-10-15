import React, { useState, useEffect } from 'react';
import { updateCertification } from '../../../Api';

const CertificationEdit = ({ isOpen, onClose, certification, onUpdated }) => {
  const [heading, setHeading] = useState('');
  const [iconPreview, setIconPreview] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (certification) {
      setHeading(certification.heading || '');
      setContent(certification.content || '');
      setIconPreview(certification.icon || '');
      setIconFile(null);
    }
  }, [certification]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!heading.trim()) return alert('Heading is required');

    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('content', content);
    if (iconFile) formData.append('icon', iconFile);

    try {
      setLoading(true);
      await updateCertification(certification._id, formData, token);
      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
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
        <h2 className="text-lg font-semibold mb-4">Edit Certification</h2>

        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
          className="border p-2 w-full mb-3 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
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

export default CertificationEdit;
