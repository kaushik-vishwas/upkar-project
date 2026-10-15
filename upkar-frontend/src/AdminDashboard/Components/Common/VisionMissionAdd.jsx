import React, { useState } from 'react';
import { createVisionMission } from '../../../Api';
import { toast } from 'react-toastify';

const VisionMissionAdd = ({ isOpen, onClose, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [missionText, setMissionText] = useState('');
  const [visionText, setVisionText] = useState('');
  const [totalExperience, setTotalExperience] = useState('');
  const [stats, setStats] = useState([{ number: '', label: '' }]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  if (!isOpen) return null;

  const handleStatChange = (index, key, value) => {
    const newStats = [...stats];
    newStats[index][key] = value;
    setStats(newStats);
  };

  const addStatField = () => setStats([...stats, { number: '', label: '' }]);
  const removeStatField = (index) =>
    setStats(stats.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !description ||
      !missionText ||
      !visionText ||
      !totalExperience ||
      !image
    ) {
      return toast.error('All fields including image are required!');
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('missionText', missionText);
    formData.append('visionText', visionText);
    formData.append('totalExperience', totalExperience);
    formData.append('image', image);
    formData.append('stats', JSON.stringify(stats));

    try {
      setLoading(true);
      await createVisionMission(formData, token);
      toast.success('Vision & Mission added successfully!');
      onSuccess();
      onClose();
      // Reset form
      setDescription('');
      setMissionText('');
      setVisionText('');
      setTotalExperience('');
      setStats([{ number: '', label: '' }]);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add Vision & Mission!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Vision & Mission</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            placeholder="Description"
            className="border p-2 w-full rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <textarea
            placeholder="Mission Text"
            className="border p-2 w-full rounded"
            value={missionText}
            onChange={(e) => setMissionText(e.target.value)}
            rows={3}
          />

          <textarea
            placeholder="Vision Text"
            className="border p-2 w-full rounded"
            value={visionText}
            onChange={(e) => setVisionText(e.target.value)}
            rows={3}
          />

          <input
            type="text"
            placeholder="Total Experience (Ex: 10+ Years of Experience)"
            className="border p-2 w-full rounded"
            value={totalExperience}
            onChange={(e) => setTotalExperience(e.target.value)}
          />

          <label className="block font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />

          <div>
            <h3 className="font-medium mb-1">Stats</h3>
            {stats.map((stat, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  placeholder="Number"
                  value={stat.number}
                  onChange={(e) =>
                    handleStatChange(index, 'number', e.target.value)
                  }
                  className="border p-1 rounded w-1/3"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, 'label', e.target.value)
                  }
                  className="border p-1 rounded w-2/3"
                />

                {stats.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStatField(index)}
                    className="text-red-500 px-2 py-1 border rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addStatField}
              className="text-blue-500 mb-2 px-2 py-1 border rounded"
            >
              + Add Stat
            </button>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Saving...' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisionMissionAdd;
