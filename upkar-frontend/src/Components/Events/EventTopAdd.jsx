import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createOrUpdateEventTop, getEventTop } from '../../Api';

const EventTopAdd = ({ isOpen, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    mainTitle: '',
    mainDescription: '',
    subTitle: '',
    subDescription: '',
  });

  const [mainImage, setMainImage] = useState(null);
  const [subImage, setSubImage] = useState(null);
  const [mainPreview, setMainPreview] = useState('');
  const [subPreview, setSubPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const res = await getEventTop();

      if (res?.eventPage) {
        setForm({
          mainTitle: res.eventPage.mainTitle || '',
          mainDescription: res.eventPage.mainDescription || '',
          subTitle: res.eventPage.subTitle || '',
          subDescription: res.eventPage.subDescription || '',
        });

        setMainPreview(res.eventPage.mainImage || '');
        setSubPreview(res.eventPage.subImage || '');
        setMainImage(null);
        setSubImage(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => formData.append(key, form[key]));

    if (mainImage) formData.append('mainImage', mainImage);
    if (subImage) formData.append('subImage', subImage);

    try {
      setLoading(true);
      await createOrUpdateEventTop(formData, token);
      toast.success('Event Top Updated Successfully');
      onUpdated();
      onClose();
    } catch (err) {
      toast.error('Failed to update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Event Top Section</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Main Title"
            className="border p-2 w-full rounded"
            value={form.mainTitle}
            onChange={(e) => setForm({ ...form, mainTitle: e.target.value })}
          />

          <textarea
            placeholder="Main Description"
            className="border p-2 w-full rounded"
            value={form.mainDescription}
            onChange={(e) =>
              setForm({ ...form, mainDescription: e.target.value })
            }
          />

          <div>
            <label className="font-medium block mb-1">Main Image</label>

            {mainPreview && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img
                  src={mainPreview}
                  alt="Main"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}

            <input
              type="file"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setMainImage(file);
                  setMainPreview(URL.createObjectURL(file));
                }
              }}
            />

            <p className="text-xs text-gray-400 mt-1">
              Leave empty if you don’t want to change the image
            </p>
          </div>

          <input
            type="text"
            placeholder="Sub Title"
            className="border p-2 w-full rounded"
            value={form.subTitle}
            onChange={(e) => setForm({ ...form, subTitle: e.target.value })}
          />

          <textarea
            placeholder="Sub Description"
            className="border p-2 w-full rounded"
            value={form.subDescription}
            onChange={(e) =>
              setForm({ ...form, subDescription: e.target.value })
            }
          />

          <div>
            <label className="font-medium block mb-1">Sub Image</label>

            {subPreview && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img
                  src={subPreview}
                  alt="Sub"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}

            <input
              type="file"
              className="border p-2 w-full rounded"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSubImage(file);
                  setSubPreview(URL.createObjectURL(file));
                }
              }}
            />

            <p className="text-xs text-gray-400 mt-1">
              Leave empty if you don’t want to change the image
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventTopAdd;
