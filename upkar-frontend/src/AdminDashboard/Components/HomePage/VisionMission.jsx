import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import VisionMissionAdd from '../Common/VisionMissionAdd';
import VisionMissionEdit from '../Common/VisionMissionEdit';
import VisionMissionViewModal from '../ViewModals/HomePage/VisionMissionView';
import { getVisionMission, deleteVisionMission } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const VisionMission = () => {
  const [visionMissions, setVisionMissions] = useState([]);
  const [selectedVision, setSelectedVision] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchVisionMissions();
  }, []);

  const fetchVisionMissions = async () => {
    try {
      const data = await getVisionMission(token);
      setVisionMissions(data);
    } catch (error) {
      console.error('Error fetching Vision & Mission:', error);
      toast.error('Failed to fetch Vision & Mission!');
    }
  };

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
        await deleteVisionMission(id, token);
        fetchVisionMissions();
        toast.success('Vision & Mission deleted successfully!');
      } catch (error) {
        console.error('Error deleting Vision & Mission:', error);
        toast.error('Failed to delete Vision & Mission!');
      }
    }
  };

  const shortText = (text = '') => {
    const words = text.split(' ');
    return words.length <= 20 ? text : words.slice(0, 20).join(' ') + '...';
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Visions & Missions</h1>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Mission
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Vision
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {visionMissions.length > 0 ? (
              visionMissions.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {shortText(item.description)}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {shortText(item.missionText)}
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate">
                    {shortText(item.visionText)}
                  </td>

                  <td className="px-6 py-4">
                    <img
                      src={item.image}
                      alt="Vision & Mission"
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    {item.stats?.slice(0, 2).map((stat, i) => (
                      <div key={i}>
                        {stat.number} - {stat.label}
                      </div>
                    ))}
                    {item.stats?.length > 2 && (
                      <span
                        className="cursor-pointer text-gray-400 ml-1"
                        title={item.stats
                          .slice(2)
                          .map((s) => `${s.number} - ${s.label}`)
                          .join(', ')}
                      >
                        ...
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">{item.totalExperience || '—'}</td>

                  <td className="px-6 py-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedVision(item);
                        setIsViewOpen(true);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedVision(item);
                        setIsEditOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  No Vision & Mission records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <VisionMissionAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={fetchVisionMissions}
      />

      <VisionMissionEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        visionMission={selectedVision}
        onSuccess={fetchVisionMissions}
      />

      <VisionMissionViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        data={selectedVision}
      />
    </div>
  );
};

export default VisionMission;
