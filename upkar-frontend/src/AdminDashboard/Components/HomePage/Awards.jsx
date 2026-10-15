import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import AwardsAdd from '../Common/AwardsAdd';
import AwardsEdit from '../Common/AwardsEdit';
import AwardsViewModal from '../ViewModals/HomePage/AwardsView';
import { getAwardsAPI, deleteAwardAPI } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const data = await getAwardsAPI();
      setAwards(data);
    } catch (error) {
      console.error('Error fetching awards:', error);
      toast.error('Failed to fetch awards!');
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
        await deleteAwardAPI(id, token);
        setAwards(awards.filter((award) => award._id !== id));
        toast.success('Award deleted successfully!');
      } catch (error) {
        console.error('Error deleting award:', error);
        toast.error('Failed to delete award!');
      }
    }
  };

  const handleAwardAdded = () => {
    fetchAwards();
    toast.success('Award added successfully!');
  };

  const handleAwardUpdated = () => {
    fetchAwards();
    toast.success('Award updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Awards</h1>
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
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
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
            {awards.map((award) => (
              <tr key={award._id}>
                <td className="px-4 py-2">{truncateText(award.title)}</td>
                <td className="px-4 py-2">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  {new Date(award.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedAward(award);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAward(award);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(award._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {awards.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No Awards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AwardsAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAwardAdded={handleAwardAdded}
      />
      <AwardsEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        award={selectedAward}
        onUpdate={handleAwardUpdated}
      />
      <AwardsViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        award={selectedAward}
      />
    </div>
  );
};

export default Awards;
