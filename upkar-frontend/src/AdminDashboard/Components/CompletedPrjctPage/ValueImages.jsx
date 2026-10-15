import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ValueImageAdd from '../Common/ValueImageAdd';
import ValueImageEdit from '../Common/ValueImageEdit';
import ValueImageView from '../ViewModals/CompletedProject/ValueImageView';
import { getValueImages, deleteValueImage } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ValueImages = () => {
  const [valueImages, setValueImages] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedValueImage, setSelectedValueImage] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchValueImages();
  }, []);

  const fetchValueImages = async () => {
    try {
      const data = await getValueImages();
      setValueImages(data);
    } catch (error) {
      toast.error('Failed to fetch images!');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This image will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteValueImage(id, token);
        setValueImages(valueImages.filter((v) => v._id !== id));
        toast.success('Value Image deleted!');
      } catch (error) {
        toast.error('Failed to delete!');
      }
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Value Images</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">Image</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {valueImages.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-12 rounded object-cover"
                  />
                </td>
                <td className="px-4 py-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-2 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedValueImage(item);
                      setIsViewOpen(true);
                    }}
                    className="text-green-600"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedValueImage(item);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ValueImageAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchValueImages}
      />

      <ValueImageEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        valueImage={selectedValueImage}
        onUpdated={fetchValueImages}
      />

      <ValueImageView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        valueImage={selectedValueImage}
      />
    </div>
  );
};

export default ValueImages;
