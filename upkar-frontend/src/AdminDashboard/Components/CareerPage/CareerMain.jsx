import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getCareerMainAPI, deleteCareerMainAPI } from '../../../Api';
import CareerMainAdd from '../Common/CareerMainAdd';
import CareerMainEdit from '../Common/CareerMainEdit';
import CareerMainViewModal from '../../Components/ViewModals/CareerPage/CareerMainView';

const CareerMainManagement = () => {
  const [careerList, setCareerList] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const token = localStorage.getItem('adminToken');

  const refresh = async () => {
    try {
      const res = await getCareerMainAPI();
      setCareerList(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch Career Main');
    }
  };

  useEffect(() => {
    refresh();
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
        await deleteCareerMainAPI(id, token);
        toast.success('Deleted successfully!');
        refresh();
      } catch (error) {
        console.error(error);
        toast.error('Delete failed!');
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Career Main</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Career Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {careerList.length > 0 ? (
              careerList.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    {truncate(item.careerDescription)}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {/* View Button */}
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelectedRow(item);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedRow(item);
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
              ))
            ) : (
              <tr>
                <td className="text-center py-4 text-gray-500" colSpan={2}>
                  No Career Main entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CareerMainAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        refresh={refresh}
      />
      <CareerMainEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={selectedRow}
        refresh={refresh}
      />
      <CareerMainViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        career={selectedRow}
      />
    </div>
  );
};

export default CareerMainManagement;
