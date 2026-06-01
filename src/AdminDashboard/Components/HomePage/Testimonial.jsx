import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { getTestimonialsAPI, deleteTestimonialAPI } from '../../../Api';

import TestimonialAdd from '../Common/TestimonialAdd';
import TestimonialEdit from '../Common/TestimonialEdit';
import TestimonialViewModal from '../../Components/ViewModals/HomePage/TestimonialView';

const Testimonial = () => {
  const [list, setList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem('adminToken');

  const refresh = async () => {
    try {
      const res = await getTestimonialsAPI();
      setList(res.data || []);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
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
        await deleteTestimonialAPI(id, token);
        toast.success('Deleted successfully!');
        refresh();
      } catch (error) {
        toast.error('Delete failed!');
      }
    }
  };

  const truncate = (text, length = 30) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Testimonials</h1>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Customer Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.length ? (
              list.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">{item.customerName}</td>

                  <td className="px-4 py-2">{truncate(item.description)}</td>

                  <td className="px-4 py-2 flex gap-3">
                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenView(true);
                      }}
                    >
                      <Eye className="text-green-500 w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelected(item);
                        setOpenEdit(true);
                      }}
                    >
                      <Edit className="text-blue-500 w-4 h-4" />
                    </button>

                    <button onClick={() => handleDelete(item._id)}>
                      <Trash2 className="text-red-500 w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No Testimonials Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TestimonialAdd
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        refresh={refresh}
      />

      <TestimonialEdit
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        data={selected}
        refresh={refresh}
      />

      <TestimonialViewModal
        isOpen={openView}
        onClose={() => setOpenView(false)}
        data={selected}
      />
    </div>
  );
};

export default Testimonial;
