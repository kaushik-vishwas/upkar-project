import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createTeamMember } from '../../../Api';

const TeamAdd = ({ isOpen, onClose, onTeamAdded }) => {
  const token = localStorage.getItem('adminToken');

  const [form, setForm] = useState({
    memberName: '',
    memberPosition: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!form.memberName || !form.memberPosition || !form.image) {
      return toast.error('All fields including image are required!');
    }

    const formData = new FormData();
    formData.append('memberName', form.memberName);
    formData.append('memberPosition', form.memberPosition);
    formData.append('memberImage', form.image);

    try {
      setLoading(true);
      await createTeamMember(formData, token);
      toast.success('Team member added successfully!');
      onTeamAdded();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add team member.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Member Name"
            className="border p-2 w-full rounded"
            value={form.memberName}
            onChange={(e) => setForm({ ...form, memberName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Member Position"
            className="border p-2 w-full rounded"
            value={form.memberPosition}
            onChange={(e) =>
              setForm({ ...form, memberPosition: e.target.value })
            }
          />

          <input
            type="file"
            className="border p-2 w-full rounded"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAdd;
