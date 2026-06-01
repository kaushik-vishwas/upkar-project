import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createTestimonialAPI } from '../../../Api';

const TestimonialAdd = ({ isOpen, onClose, refresh }) => {
  const [form, setForm] = useState({
    customerName: '',
    description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      await createTestimonialAPI(form, token);

      toast.success('Testimonial Added');

      refresh();
      onClose();

      setForm({
        customerName: '',
        description: '',
      });
    } catch (error) {
      toast.error('Failed to add testimonial');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Testimonial</h2>

        <input
          type="text"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) =>
            setForm({
              ...form,
              customerName: e.target.value,
            })
          }
          className="border p-2 w-full rounded"
        />

        <textarea
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="border p-2 w-full rounded mt-3"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialAdd;
