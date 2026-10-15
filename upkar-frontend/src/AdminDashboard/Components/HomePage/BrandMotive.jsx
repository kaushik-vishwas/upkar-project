import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import BrandMotiveAdd from '../Common/BrandMotiveAdd';
import BrandMotiveEdit from '../Common/BrandMotiveEdit';
import BrandMotiveViewModal from '../ViewModals/HomePage/BrandMotiveView';
import { getBrandMotive, deleteBrandMotive } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const BrandMotiveAdmin = () => {
  const [motiveList, setMotiveList] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedMotive, setSelectedMotive] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchMotives();
  }, []);

  const fetchMotives = async () => {
    try {
      const data = await getBrandMotive(token);
      setMotiveList(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch Brand Motive!');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (result.isConfirmed) {
      try {
        await deleteBrandMotive(id, token);
        setMotiveList(motiveList.filter((m) => m._id !== id));
        toast.success('Brand Motive deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete Brand Motive!');
      }
    }
  };

  const handleAddSuccess = () => {
    fetchMotives();
    toast.success('Brand Motive added successfully!');
  };

  const handleEditSuccess = () => {
    fetchMotives();
    toast.success('Brand Motive updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 40 ? text.substring(0, 40) + '...' : text;
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Brand Motive</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <div className="min-w-[800px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[300px]">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[300px]">
                  Highlight Text
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[150px]">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[160px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {motiveList.map((motive) => (
                <tr key={motive._id}>
                  <td className="px-6 py-4">{truncateText(motive.title)}</td>
                  <td className="px-6 py-4">
                    {truncateText(motive.highlightText)}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(motive.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedMotive(motive);
                        setIsViewOpen(true);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedMotive(motive);
                        setIsEditOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(motive._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {motiveList.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No Brand Motive found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BrandMotiveAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAddSuccess}
      />
      <BrandMotiveEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        motive={selectedMotive}
        onUpdated={handleEditSuccess}
      />
      <BrandMotiveViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        motive={selectedMotive}
      />
    </div>
  );
};

export default BrandMotiveAdmin;
