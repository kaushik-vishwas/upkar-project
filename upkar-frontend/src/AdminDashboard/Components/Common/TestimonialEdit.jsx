import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateTestimonialAPI } from '../../../Api';

const TestimonialEdit = ({ isOpen, onClose, data, refresh }) => {
  const [form, setForm] = useState({
    customerName: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setForm({
        customerName: data.customerName || '',
        description: data.description || '',
      });
    }
  }, [data]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.customerName.trim() || !form.description.trim()) {
      toast.error('Customer Name and Description are required');
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem('adminToken');

      await updateTestimonialAPI(data._id, form, token);

      toast.success('Testimonial updated successfully!');

      refresh();
      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message || 'Failed to update testimonial',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Testimonial</h2>

        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-3"
          rows={5}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialEdit;
