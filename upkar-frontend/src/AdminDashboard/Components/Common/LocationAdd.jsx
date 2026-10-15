import React, { useState } from 'react';
import { createLocation } from '../../../Api';
import { toast } from 'react-toastify';

const LocationAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    title: '',
    locationUrl: '',
    embedUrl: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.embedUrl || !form.locationUrl) {
      toast.error('All fields required');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await createLocation(form, token);
      toast.success('Location added!');
      onAdded();
      onClose();
    } catch (error) {
      toast.error('Failed to add');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Add Location</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Title"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            placeholder="Google Maps Embed URL"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, embedUrl: e.target.value })}
          />

          <input
            placeholder="Location URL"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, locationUrl: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationAdd;
