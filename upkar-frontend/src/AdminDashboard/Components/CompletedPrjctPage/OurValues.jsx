import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import OurValueAdd from '../../Components/Common/OurValueAdd';
import OurValueEdit from '../../Components/Common/OurValueEdit';
import OurValueViewModal from '../../Components/ViewModals/CompletedProject/OurValueView';
import { getAllOurValues, deleteOurValue } from '../../../Api';

const OurValuesMain = () => {
  const [values, setValues] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = async () => {
    try {
      const data = await getAllOurValues();
      setValues(data.data || data);
    } catch (error) {
      console.error('Error fetching values:', error);
      toast.error('Failed to fetch Our Values!');
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
        await deleteOurValue(id, token);
        setValues(values.filter((v) => v._id !== id));
        toast.success('Value deleted successfully!');
      } catch (error) {
        console.error('Error deleting:', error);
        toast.error('Failed to delete value!');
      }
    }
  };

  const handleAdded = () => {
    fetchValues();
    toast.success('Value added successfully!');
  };

  const handleUpdated = () => {
    fetchValues();
    toast.success('Value updated successfully!');
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Our Values</h1>
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
                Icon
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {values.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">{truncate(item.title)}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.iconImage}
                    alt=""
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  {/* View button */}
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => {
                      setSelectedValue(item);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedValue(item);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {values.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No Values Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <OurValueAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAdded}
      />
      <OurValueEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        value={selectedValue}
        onUpdated={handleUpdated}
      />
      <OurValueViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        value={selectedValue}
      />
    </div>
  );
};

export default OurValuesMain;
