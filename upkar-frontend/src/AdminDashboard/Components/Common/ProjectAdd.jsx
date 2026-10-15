import React, { useState } from 'react';
import { createProject } from '../../../Api';

const ProjectAdd = ({ isOpen, onClose, onProjectAdded }) => {
  const [type, setType] = useState('');
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [bulletPoints, setBulletPoints] = useState(['']);
  const [boxMessage, setBoxMessage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  const handleBulletChange = (index, value) => {
    const newBullets = [...bulletPoints];
    newBullets[index] = value;
    setBulletPoints(newBullets);
  };

  const addBullet = () => setBulletPoints([...bulletPoints, '']);
  const removeBullet = (index) =>
    setBulletPoints(bulletPoints.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !heading || !description || !boxMessage || !image)
      return alert('All fields required!');

    const formData = new FormData();
    formData.append('type', type);
    formData.append('heading', heading);
    formData.append('description', description);
    formData.append('bulletPoints', bulletPoints.join(','));
    formData.append('boxMessage', boxMessage);
    formData.append('image', image);

    try {
      setLoading(true);
      await createProject(formData, token);
      onProjectAdded();
      onClose();
    } catch (error) {
      console.error(error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Project</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Type</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded"
            rows={3}
          />

          <div>
            <label className="block font-medium mb-1">Bullet Points</label>
            {bulletPoints.map((bp, i) => (
              <div key={i} className="flex gap-2 mb-1 items-center">
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => handleBulletChange(i, e.target.value)}
                  className="border p-1 rounded flex-1"
                />
                {bulletPoints.length > 1 && (
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
            value={boxMessage}
            onChange={(e) => setBoxMessage(e.target.value)}
            className="border p-2 w-full rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-2"
          />

          <div className="flex justify-end gap-2 mt-4">
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
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAdd;
