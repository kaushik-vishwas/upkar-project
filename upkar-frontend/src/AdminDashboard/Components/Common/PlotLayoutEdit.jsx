import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updatePlotLayout } from '../../../Api';

const PlotLayoutEdit = ({ isOpen, onClose, layout, onUpdate }) => {
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (layout) {
      setMainImage(null);
      setMainImagePreview(layout.mainImage || '');
      setIcons(
        layout.icons?.map((ic) => ({
          file: null,
          preview: ic.icon,
          heading: ic.heading,
          subheading: ic.subheading,
        })) || []
      );
    }
  }, [layout]);

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
    if (!mainImagePreview && !mainImage) {
      toast.error('Main image is required!');
      return;
    }

    const formData = new FormData();

    if (mainImage) formData.append('mainImage', mainImage);

    icons.forEach((icon) => {
      if (icon.file) formData.append('icons', icon.file);
    });

    formData.append(
      'icons',
      JSON.stringify(
        icons.map((ic) => ({
          heading: ic.heading,
          subheading: ic.subheading,
        }))
      )
    );

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await updatePlotLayout(layout._id, formData, token);
      toast.success('Plot layout updated successfully!');
      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      console.error('Plot layout update error:', err);
      toast.error('Failed to update plot layout!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50 overflow-auto pt-10">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg my-6">
        <h2 className="text-xl font-semibold mb-4">Edit Plot Layout</h2>
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
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotLayoutEdit;
