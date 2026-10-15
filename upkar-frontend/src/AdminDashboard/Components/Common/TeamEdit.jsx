import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { updateTeamMember } from '../../../Api';

const token = localStorage.getItem('adminToken');

const TeamEdit = ({ isOpen, onClose, item, onTeamUpdated }) => {
  const [form, setForm] = useState({
    memberName: '',
    memberPosition: '',
    memberImage: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setForm({
        memberName: item.memberName,
        memberPosition: item.memberPosition,
        memberImage: null,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async () => {
    if (!form.memberName || !form.memberPosition) {
      return toast.error('Name & position are required!');
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('memberName', form.memberName);
      formData.append('memberPosition', form.memberPosition);

      if (form.memberImage) {
        formData.append('memberImage', form.memberImage);
      }

      await updateTeamMember(item._id, formData, token);

      toast.success('Team member updated!');
      onTeamUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update team member.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Team Member</h2>

        <div className="space-y-3">
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.memberName}
            onChange={(e) => setForm({ ...form, memberName: e.target.value })}
          />

          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.memberPosition}
            onChange={(e) =>
              setForm({ ...form, memberPosition: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={(e) =>
              setForm({ ...form, memberImage: e.target.files[0] })
            }
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamEdit;
