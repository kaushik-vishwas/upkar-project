import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getWhyJoinAPI, deleteWhyJoinAPI } from '../../../Api';
import WhyJoinAdd from '../Common/WhyJoinAdd';
import WhyJoinEdit from '../Common/WhyJoinEdit';
import WhyJoinViewModal from '../../Components/ViewModals/CareerPage/WhyJoinView';

const WhyJoinMain = () => {
  const [list, setList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem('adminToken');

  const refresh = async () => {
    try {
      const res = await getWhyJoinAPI();
      setList(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch Why Join Us');
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteWhyJoinAPI(id, token);
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
        <h1 className="text-2xl font-bold">Why Join</h1>
        <button
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setOpenAdd(true)}
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
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 w-36">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {list.length ? (
              list.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{truncate(item.title)}</td>
                  <td className="px-4 py-2 w-[60%]">
                    {truncate(item.description)}
                  </td>
                  <td className="px-4 py-2 flex gap-3">
                    {/* View Button */}
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelected(item);
                        setOpenView(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelected(item);
                        setOpenEdit(true);
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
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No Why Join Us found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <WhyJoinAdd
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        refresh={refresh}
      />
      <WhyJoinEdit
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        data={selected}
        refresh={refresh}
      />
      <WhyJoinViewModal
        isOpen={openView}
        onClose={() => setOpenView(false)}
        data={selected}
      />
    </div>
  );
};

export default WhyJoinMain;
