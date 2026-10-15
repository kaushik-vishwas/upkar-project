import React, { useEffect, useState } from 'react';
import { updateAwardRecognition } from '../../../Api';

const AwardEdit = ({ isOpen, onClose, award, onUpdated }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (award) {
      setTitle(award.title || '');
      setSubtitle(award.subtitle || '');
    }
  }, [award]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    await updateAwardRecognition(award._id, formData, token);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 w-[400px] rounded">
        <h2 className="font-bold mb-3">Edit Award</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-3 py-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AwardEdit;
