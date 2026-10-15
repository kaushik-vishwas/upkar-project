import React, { useState } from 'react';
import { createAboutProjectAPI } from '../../../Api';
import { toast } from 'react-toastify';

const AboutProjectAdd = ({ isOpen, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    aboutHeading: '',
    aboutDescription: '',
    reRaising: '',
    reRadescription: '',
    noBrokerHeading: '',
    builderHeading: '',
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      await createAboutProjectAPI(formData, token);
      toast.success('About Project added successfully!');
      refresh();
      onClose();
      setFormData({
        aboutHeading: '',
        aboutDescription: '',
        reRaising: '',
        reRadescription: '',
        noBrokerHeading: '',
        builderHeading: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Failed to add About Project'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add About Project</h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="About Heading"
            name="aboutHeading"
            value={formData.aboutHeading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="About Description"
            name="aboutDescription"
            value={formData.aboutDescription}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={3}
          />
          <input
            type="text"
            placeholder="RE Raising"
            name="reRaising"
            value={formData.reRaising}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="RE Description"
            name="reRadescription"
            value={formData.reRadescription}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={2}
          />
          <input
            type="text"
            placeholder="No Broker Heading"
            name="noBrokerHeading"
            value={formData.noBrokerHeading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            placeholder="Builder Heading"
            name="builderHeading"
            value={formData.builderHeading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutProjectAdd;
