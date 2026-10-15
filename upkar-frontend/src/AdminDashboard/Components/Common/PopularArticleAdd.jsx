import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createArticle } from '../../../Api';

const PopularArticleAdd = ({ isOpen, onClose, onAdded }) => {
  const [form, setForm] = useState({
    mainDescription: '',
    mainImage: null,
    subItems: [{ subHeading: '', subDescription: '', subImage: null }],
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleMainImageChange = (e) =>
    setForm({ ...form, mainImage: e.target.files[0] });

  const handleSubItemChange = (index, key, value) => {
    const newSubItems = [...form.subItems];
    newSubItems[index][key] = value;
    setForm({ ...form, subItems: newSubItems });
  };

  const handleSubImageChange = (index, file) =>
    handleSubItemChange(index, 'subImage', file);

  const addSubItem = () =>
    setForm({
      ...form,
      subItems: [
        ...form.subItems,
        { subHeading: '', subDescription: '', subImage: null },
      ],
    });

  const removeSubItem = (index) => {
    const newSubItems = form.subItems.filter((_, i) => i !== index);
    setForm({ ...form, subItems: newSubItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.mainDescription || !form.mainImage) {
      toast.error('Main Description and Image are required!');
      return;
    }

    const fd = new FormData();
    fd.append('mainDescription', form.mainDescription);
    fd.append('mainImage', form.mainImage);

    form.subItems.forEach((sub) => {
      fd.append('subHeading[]', sub.subHeading);
      fd.append('subDescription[]', sub.subDescription);
      if (sub.subImage) fd.append('subImages', sub.subImage);
    });

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await createArticle(fd, token);

      if (res.success) {
        toast.success('Article added successfully!');
        onAdded();
        onClose();
        setForm({
          mainDescription: '',
          mainImage: null,
          subItems: [{ subHeading: '', subDescription: '', subImage: null }],
        });
      } else toast.error(res.message || 'Failed to add article');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">Add Popular Article</h2>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            name="mainDescription"
            placeholder="Main Description"
            className="border p-2 rounded"
            value={form.mainDescription}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleMainImageChange(e)}
          />

          <h3 className="mt-4 font-semibold">Sub Items</h3>
          {form.subItems.map((sub, i) => (
            <div
              key={i}
              className="border p-2 rounded flex flex-col gap-2 relative"
            >
              <input
                type="text"
                placeholder="Sub Heading"
                value={sub.subHeading}
                onChange={(e) =>
                  handleSubItemChange(i, 'subHeading', e.target.value)
                }
                className="border p-1 rounded"
              />
              <textarea
                placeholder="Sub Description"
                value={sub.subDescription}
                onChange={(e) =>
                  handleSubItemChange(i, 'subDescription', e.target.value)
                }
                className="border p-1 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleSubImageChange(i, e.target.files[0])}
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
            type="button"
            onClick={addSubItem}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-2"
          >
            + Add Sub Item
          </button>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopularArticleAdd;
