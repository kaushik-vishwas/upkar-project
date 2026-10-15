import React, { useState, useEffect } from 'react';
import { updateArticle } from '../../../Api';

const PopularArticleEdit = ({ isOpen, onClose, article, onUpdated }) => {
  const [form, setForm] = useState({
    mainDescription: '',
    mainImage: null,
    subItems: [],
  });

  const [preview, setPreview] = useState('');
  const [subPreviews, setSubPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (article) {
      setForm({
        mainDescription: article.mainDescription,
        mainImage: null,
        subItems: article.subItems.map((sub) => ({
          subHeading: sub.subHeading,
          subDescription: sub.subDescription,
          existingSubImage:
            typeof sub.subImage === 'string'
              ? sub.subImage
              : sub.subImage?.url || '',
          subImage: null,
        })),
      });

      setPreview(
        typeof article.mainImage === 'string'
          ? article.mainImage
          : article.mainImage?.url || ''
      );

      setSubPreviews(
        article.subItems.map((sub) =>
          typeof sub.subImage === 'string'
            ? sub.subImage
            : sub.subImage?.url || ''
        )
      );
    }
  }, [article]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, mainImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubItemChange = (index, key, value) => {
    const updated = [...form.subItems];
    updated[index][key] = value;
    setForm({ ...form, subItems: updated });
  };

  const handleSubImageChange = (index, file) => {
    if (!file) return;

    const previews = [...subPreviews];
    previews[index] = URL.createObjectURL(file);
    setSubPreviews(previews);

    const updated = [...form.subItems];
    updated[index].subImage = file;

    setForm({ ...form, subItems: updated });
  };

  const addSubItem = () => {
    setForm({
      ...form,
      subItems: [
        ...form.subItems,
        {
          subHeading: '',
          subDescription: '',
          subImage: null,
          existingSubImage: '',
        },
      ],
    });
    setSubPreviews([...subPreviews, '']);
  };

  const removeSubItem = (index) => {
    setForm({
      ...form,
      subItems: form.subItems.filter((_, i) => i !== index),
    });
    setSubPreviews(subPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append('mainDescription', form.mainDescription);

    if (form.mainImage) {
      fd.append('mainImage', form.mainImage);
    }

    form.subItems.forEach((sub) => {
      fd.append('subHeading[]', sub.subHeading);
      fd.append('subDescription[]', sub.subDescription);

      if (sub.subImage) {
        fd.append('subImages', sub.subImage);
      } else {
        fd.append(
          'existingSubImages[]',
          typeof sub.existingSubImage === 'string'
            ? sub.existingSubImage
            : sub.existingSubImage?.url || ''
        );
      }
    });

    try {
      setLoading(true);
      const res = await updateArticle(article._id, fd, token);

      if (res.success) {
        onUpdated();
        onClose();
      } else {
        alert(res.message || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Edit Popular Article</h2>

        <textarea
          name="mainDescription"
          value={form.mainDescription}
          onChange={handleChange}
          className="border p-2 rounded mb-2 w-full"
          placeholder="Main Description"
        />

        <input type="file" accept="image/*" onChange={handleMainImageChange} />

        {preview && (
          <img
            src={preview}
            className="w-full h-32 object-cover rounded mt-2"
          />
        )}

        <h3 className="mt-4 font-semibold">Sub Items</h3>

        {form.subItems.map((sub, i) => (
          <div
            key={i}
            className="border p-2 rounded flex flex-col gap-2 relative"
          >
            <input
              type="text"
              value={sub.subHeading}
              onChange={(e) =>
                handleSubItemChange(i, 'subHeading', e.target.value)
              }
              className="border p-1 rounded"
              placeholder="Sub Heading"
            />

            <textarea
              value={sub.subDescription}
              onChange={(e) =>
                handleSubItemChange(i, 'subDescription', e.target.value)
              }
              className="border p-1 rounded"
              placeholder="Sub Description"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleSubImageChange(i, e.target.files[0])}
            />

            <img
              src={
                subPreviews[i]
                  ? subPreviews[i]
                  : typeof sub.existingSubImage === 'string'
                  ? sub.existingSubImage
                  : sub.existingSubImage?.url || ''
              }
              className="w-full h-24 object-cover rounded"
            />

            {form.subItems.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubItem(i)}
                className="absolute top-1 right-1 text-red-500"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addSubItem}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
        >
          + Add Sub Item
        </button>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularArticleEdit;
