import React, { useState, useEffect } from 'react';
import { updateLocation } from '../../../Api';
import { toast } from 'react-toastify';

const LocationEdit = ({ isOpen, onClose, data, onUpdated }) => {
  const [form, setForm] = useState({
    title: '',
    embedUrl: '',
    locationUrl: '',
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        locationUrl: data.locationUrl,
        embedUrl: data.embedUrl,
      });
    }
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('adminToken');
      await updateLocation(data._id, form, token);
      toast.success('Updated successfully');
      onUpdated();
      onClose();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Location</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={form.title}
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <input
            value={form.embedUrl}
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, embedUrl: e.target.value })}
          />

          <input
            value={form.locationUrl}
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, locationUrl: e.target.value })}
          />

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LocationEdit;
