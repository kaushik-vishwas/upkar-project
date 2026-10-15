import React, { useState, useEffect } from 'react';
import { updateProjectMain } from '../../../Api';

const ProjectMainEdit = ({ isOpen, onClose, project, onProjectUpdated }) => {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    mainImages: [null, null, null],
    customerHeading: '',
    customerDescription: '',
    ratingText: '',
  });

  const [imagePreviews, setImagePreviews] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (project) {
      setFormData({
        heading: project.heading || '',
        description: project.description || '',
        mainImages: [null, null, null],
        customerHeading: project.customerHeading || '',
        customerDescription: project.customerDescription || '',
        ratingText: project.ratingText || '',
      });
      setImagePreviews(project.mainImages || ['', '', '']);
    }
  }, [project]);

  if (!isOpen) return null;

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;
    if (name === 'mainImages' && index !== null) {
      const newImages = [...formData.mainImages];
      const newPreviews = [...imagePreviews];
      const file = files[0];
      newImages[index] = file;
      newPreviews[index] = file
        ? URL.createObjectURL(file)
        : imagePreviews[index];
      setFormData({ ...formData, mainImages: newImages });
      setImagePreviews(newPreviews);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (!formData.heading || !formData.description)
      return alert('Heading and description are required!');

    const form = new FormData();
    form.append('heading', formData.heading);
    form.append('description', formData.description);
    form.append('customerHeading', formData.customerHeading);
    form.append('customerDescription', formData.customerDescription);
    form.append('ratingText', formData.ratingText);

    formData.mainImages.forEach((img) => {
      if (img) form.append('mainImages', img);
    });

    try {
      setLoading(true);
      await updateProjectMain(project._id, form, token);
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>

        <form className="space-y-3">
          <input
            type="text"
            name="heading"
            placeholder="Heading"
            value={formData.heading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={3}
          />

          <div className="flex flex-col gap-2">
            <label className="font-medium">Main Images (3)</label>
            {imagePreviews.map((preview, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <input
                  type="file"
                  name="mainImages"
                  accept="image/*"
                  onChange={(e) => handleChange(e, idx)}
                  className="rounded"
                />
                {preview && (
                  <img
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>

          <input
            type="text"
            name="customerHeading"
            placeholder="Customer Heading"
            value={formData.customerHeading}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <textarea
            name="customerDescription"
            placeholder="Customer Description"
            value={formData.customerDescription}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={2}
          />

          <input
            type="text"
            name="ratingText"
            placeholder="Rating Text"
            value={formData.ratingText}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectMainEdit;
