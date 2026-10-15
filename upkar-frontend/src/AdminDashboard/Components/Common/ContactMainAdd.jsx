import React, { useState } from 'react';
import { createContactMain } from '../../../Api';
import { toast } from 'react-toastify';

const ContactMainAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    heading: '',
    description: '',
    mainImage: null,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.heading || !form.description || !form.mainImage) {
      toast.error('All fields required');
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    try {
      const token = localStorage.getItem('adminToken');
      await createContactMain(fd, token);
      toast.success('Added successfully!');
      onAdded();
      onClose();
    } catch (err) {
      toast.error('Failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Add Contact Main</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Heading"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="file"
            onChange={(e) => setForm({ ...form, mainImage: e.target.files[0] })}
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} type="button">
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

export default ContactMainAdd;
