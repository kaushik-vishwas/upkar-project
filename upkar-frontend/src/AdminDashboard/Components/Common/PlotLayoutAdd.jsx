import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createPlotLayout } from '../../../Api';

const PlotLayoutAdd = ({ isOpen, onClose, onAdd }) => {
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [icons, setIcons] = useState([
    { file: null, preview: '', heading: '', subheading: '' },
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleIconChange = (index, field, value) => {
    const updatedIcons = [...icons];
    updatedIcons[index][field] = value;
    setIcons(updatedIcons);
  };

  const handleIconFileChange = (index, file) => {
    const updatedIcons = [...icons];
    updatedIcons[index].file = file;
    updatedIcons[index].preview = URL.createObjectURL(file);
    setIcons(updatedIcons);
  };

  const addIconField = () => {
    setIcons([
      ...icons,
      { file: null, preview: '', heading: '', subheading: '' },
    ]);
  };

  const handleSubmit = async () => {
    if (!mainImage) {
      toast.error('Main image is required!');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      toast.error('You must be logged in!');
      return;
    }

    const formData = new FormData();
    formData.append('mainImage', mainImage);

    icons.forEach((icon) => {
      if (icon.file) formData.append('icons', icon.file);
    });

    formData.append(
      'icons',
      JSON.stringify(
        icons.map((ic) => ({ heading: ic.heading, subheading: ic.subheading })),
      ),
    );

    try {
      setLoading(true);
      const data = await createPlotLayout(formData, token);
      toast.success(data.message || 'Plot layout added successfully!');
      if (onAdd) onAdd();
      onClose();
      setMainImage(null);
      setMainImagePreview('');
      setIcons([{ file: null, preview: '', heading: '', subheading: '' }]);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || 'Failed to add plot layout!',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 overflow-auto pt-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg my-6">
        <h2 className="text-xl font-semibold mb-4">Add Plot Layout</h2>
        <div className="flex flex-col gap-3">
          <div>
            <label className="font-medium">Main Image</label>
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main"
                className="w-32 h-20 object-cover rounded mb-2"
              />
            )}
            <input
              type="file"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                setMainImage(e.target.files[0]);
                setMainImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <label className="font-medium">Icons</label>
          {icons.map((ic, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 border p-2 rounded mb-2"
            >
              {ic.preview && (
                <img
                  src={ic.preview}
                  alt="Icon"
                  className="w-16 h-16 object-cover rounded mb-1"
                />
              )}
              <input
                type="file"
                className="border p-1 w-full rounded"
                onChange={(e) => handleIconFileChange(index, e.target.files[0])}
              />
              <input
                type="text"
                placeholder="Heading"
                className="border p-1 w-full rounded"
                value={ic.heading}
                onChange={(e) =>
                  handleIconChange(index, 'heading', e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Subheading"
                className="border p-1 w-full rounded"
                value={ic.subheading}
                onChange={(e) =>
                  handleIconChange(index, 'subheading', e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 w-max mb-3"
            onClick={addIconField}
          >
            + Add Icon
          </button>

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

export default PlotLayoutAdd;
