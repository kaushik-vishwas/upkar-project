import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateFeature } from '../../../Api';

const FeatureEdit = ({ isOpen, onClose, feature, onFeatureUpdated }) => {
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [icons, setIcons] = useState([
    { icon: '', iconTitle: '', file: null, preview: '' },
  ]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (feature) {
      setDescription(feature.description || '');
      setMainImagePreview(feature.mainImage || '');
      setMainImage(null);
      setIcons(
        feature.icons && feature.icons.length
          ? feature.icons.map((icon) => ({
              icon: icon.icon || '',
              iconTitle: icon.iconTitle || '',
              file: null,
              preview: icon.iconImage || '',
            }))
          : [{ icon: '', iconTitle: '', file: null, preview: '' }]
      );
    }
  }, [feature]);

  if (!isOpen) return null;

  const handleIconChange = (index, field, value) => {
    const newIcons = [...icons];
    newIcons[index][field] = value;
    setIcons(newIcons);
  };

  const handleIconFileChange = (index, file) => {
    const newIcons = [...icons];
    newIcons[index].file = file;
    newIcons[index].preview = URL.createObjectURL(file);
    setIcons(newIcons);
  };

  const addIcon = () => {
    if (icons.length < 3)
      setIcons([
        ...icons,
        { icon: '', iconTitle: '', file: null, preview: '' },
      ]);
  };

  const removeIcon = (index) => {
    setIcons(icons.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!description) {
      toast.error('Description is required!');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    if (mainImage) formData.append('mainImage', mainImage);

    icons.forEach((icon, idx) => {
      if (icon.file) {
        formData.append(`icon${idx + 1}`, icon.file);
      } else if (icon.preview) {
        formData.append(`iconUrl${idx + 1}`, icon.preview);
      }

      formData.append(`iconTitle${idx + 1}`, icon.iconTitle || '');
    });

    try {
      setLoading(true);
      await updateFeature(feature._id, formData, token);
      toast.success('Feature updated successfully!');
      onFeatureUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update feature!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg my-6">
        <h2 className="text-xl font-semibold mb-4">Edit Feature</h2>
        <div className="flex flex-col gap-3">
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

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

          <div>
            <label className="font-medium">Icons (max 3)</label>
            {icons.map((icon, idx) => (
              <div key={idx} className="flex flex-col gap-1 mt-2">
                <div className="flex gap-2 items-center flex-wrap">
                  <input
                    type="text"
                    placeholder="Icon"
                    className="border p-2 w-16 rounded"
                    value={icon.icon}
                    onChange={(e) =>
                      handleIconChange(idx, 'icon', e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Icon Title"
                    className="border p-2 flex-1 rounded"
                    value={icon.iconTitle}
                    onChange={(e) =>
                      handleIconChange(idx, 'iconTitle', e.target.value)
                    }
                  />
                  {icons.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => removeIcon(idx)}
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="file"
                    className="border p-2 rounded w-full"
                    onChange={(e) =>
                      handleIconFileChange(idx, e.target.files[0])
                    }
                  />
                  {icon.preview && (
                    <img
                      src={icon.preview}
                      alt="Icon"
                      className="w-12 h-12 object-cover rounded mt-1"
                    />
                  )}
                </div>
              </div>
            ))}
            {icons.length < 3 && (
              <button
                type="button"
                className="mt-2 px-3 py-1 bg-gray-200 rounded"
                onClick={addIcon}
              >
                Add Icon
              </button>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
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

export default FeatureEdit;
