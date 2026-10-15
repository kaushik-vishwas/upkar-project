import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import TeamAdd from '../../Components/Common/TeamAdd';
import TeamEdit from '../../Components/Common/TeamEdit';
import TeamViewModal from '../../Components/ViewModals/AboutPage/TeamView';
import { getAllTeamMembers, deleteTeamMember } from '../../../Api';

const token = localStorage.getItem('adminToken');

const Team = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamData, setTeamData] = useState([]);

  const fetchTeam = async () => {
    try {
      const res = await getAllTeamMembers();
      setTeamData(res.members || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch team members.');
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteTeamMember(id, token);
        toast.success('Team member deleted successfully!');
        fetchTeam();
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete team member.');
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Position
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {teamData.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">
                  <img
                    src={item.memberImage}
                    alt={item.memberName}
                    className="w-14 h-14 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">{truncate(item.memberName)}</td>
                <td className="px-4 py-2">{truncate(item.memberPosition)}</td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => {
                      setSelectedTeam(item);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedTeam(item);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {teamData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No team members available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TeamAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onTeamAdded={fetchTeam}
      />
      <TeamEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        item={selectedTeam}
        onTeamUpdated={fetchTeam}
      />
      <TeamViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        item={selectedTeam}
      />
    </div>
  );
};

export default Team;
