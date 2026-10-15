import React, { useState, useEffect } from 'react';
import { updateProject } from '../../../Api';

const ProjectEdit = ({ isOpen, onClose, project, onUpdate }) => {
  const [form, setForm] = useState({
    type: '',
    heading: '',
    description: '',
    bulletPoints: [''],
    boxMessage: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (project) {
      setForm({
        type: project.type || '',
        heading: project.heading || '',
        description: project.description || '',
        bulletPoints: project.bulletPoints || [''],
        boxMessage: project.boxMessage || '',
        image: null,
      });
      setImagePreview(project.image);
    }
  }, [project]);

  if (!isOpen) return null;

  const handleBulletChange = (index, value) => {
    const newBullets = [...form.bulletPoints];
    newBullets[index] = value;
    setForm({ ...form, bulletPoints: newBullets });
  };

  const addBullet = () =>
    setForm({ ...form, bulletPoints: [...form.bulletPoints, ''] });
  const removeBullet = (i) =>
    setForm({
      ...form,
      bulletPoints: form.bulletPoints.filter((_, idx) => idx !== i),
    });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('heading', form.heading);
    formData.append('description', form.description);
    formData.append('bulletPoints', form.bulletPoints.join(','));
    formData.append('boxMessage', form.boxMessage);
    if (form.image) formData.append('image', form.image);

    try {
      await updateProject(project._id, formData, token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to update project');
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        >
          <option value="">Select Type</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="text"
          value={form.heading}
          onChange={(e) => setForm({ ...form, heading: e.target.value })}
          className="border p-2 w-full rounded mb-2"
          placeholder="Heading"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 w-full rounded mb-2"
          rows={3}
          placeholder="Description"
        />

        <div>
          <label className="block font-medium mb-1">Bullet Points</label>
          {form.bulletPoints.map((bp, i) => (
            <div key={i} className="flex gap-2 mb-1 items-center">
              <input
                type="text"
                value={bp}
                onChange={(e) => handleBulletChange(i, e.target.value)}
                className="border p-1 rounded flex-1"
              />
              {form.bulletPoints.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBullet(i)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBullet}
            className="text-blue-500 mb-2"
          >
            + Add Bullet
          </button>
        </div>

        <input
          type="text"
          placeholder="Box Message"
          value={form.boxMessage}
          onChange={(e) => setForm({ ...form, boxMessage: e.target.value })}
          className="border p-2 w-full rounded mb-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setForm({ ...form, image: e.target.files[0] });
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          }}
          className="mb-2"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-32 object-cover rounded mb-2"
          />
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
