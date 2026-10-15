import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import ContactMainAdd from '../../Components/Common/ContactMainAdd';
import ContactMainEdit from '../../Components/Common/ContactMainEdit';
import ContactMainView from '../../Components/ViewModals/ContactPage/ContactMainView';
import { getContactMain, deleteContactMain } from '../../../Api';

const ContactMain = () => {
  const [data, setData] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getContactMain();
      setData(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch data');
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteContactMain(token);
        setData(null);
        toast.success('Deleted successfully!');
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <ToastContainer />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Contact Main</h1>

        {!data && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            <Plus size={16} /> Add
          </button>
        )}
      </div>

      {data ? (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">{data.heading}</h2>
          <p className="text-gray-600 mt-2">{data.description}</p>

          {data.mainImage && (
            <img
              src={data.mainImage}
              alt=""
              className="w-full h-48 object-cover rounded mt-4"
            />
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setIsViewOpen(true)}
              className="text-green-500"
            >
              <Eye />
            </button>

            <button
              onClick={() => setIsEditOpen(true)}
              className="text-blue-500"
            >
              <Edit />
            </button>

            <button onClick={handleDelete} className="text-red-500">
              <Trash2 />
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No Contact Main Added.</p>
      )}

      <ContactMainAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchData}
      />

      <ContactMainEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={data}
        onUpdated={fetchData}
      />

      <ContactMainView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        data={data}
      />
    </div>
  );
};

export default ContactMain;
