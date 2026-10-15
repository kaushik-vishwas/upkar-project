import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import CareerImagesAdd from '../Common/CareerImagesAdd';
import CareerImagesEdit from '../Common/CareerImagesEdit';
import CareerImagesViewModal from '../../Components/ViewModals/CareerPage/CareerImagesView';
import {
  getCareerImages,
  createCareerImages,
  updateCareerImages,
  deleteCareerImages,
} from '../../../Api';

const CareerImagesMain = () => {
  const [images, setImages] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const token = localStorage.getItem('adminToken');

  const fetchImages = async () => {
    try {
      const res = await getCareerImages();
      setImages(res || []);
    } catch (err) {
      console.error('Failed to fetch career images:', err);
      toast.error('Failed to fetch career images');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async (newData) => {
    try {
      const formData = new FormData();
      newData.images.forEach((img) => formData.append('images', img));
      await createCareerImages(formData, token);
      fetchImages();
      setIsAddOpen(false);
      toast.success('Career images added successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add career images');
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const formData = new FormData();
      updatedData.images.forEach((img) => formData.append('images', img));
      await updateCareerImages(selectedImage._id, formData, token);
      fetchImages();
      setIsEditOpen(false);
      toast.success('Career images updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update career images');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCareerImages(id, token);
        fetchImages();
        toast.success('Deleted successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Delete failed!');
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Career Images</h1>
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
                Images
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {images.length ? (
              images.map((item) => (
                <tr key={item._id}>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      {item.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Career ${idx}`}
                          className="w-20 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="p-1 text-green-500 hover:text-green-700 rounded  hover:bg-gray-100"
                      onClick={() => {
                        setSelectedImage(item);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    <button
                      className="p-1 text-blue-500 hover:text-blue-700 rounded  hover:bg-gray-100"
                      onClick={() => {
                        setSelectedImage(item);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-5 h-5" />
                    </button>

                    <button
                      className="p-1 text-red-500 hover:text-red-700 rounded  hover:bg-gray-100"
                      onClick={() => handleDelete(item._id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-4 text-gray-500">
                  No Career Images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CareerImagesAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
      />
      <CareerImagesEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedImage}
        onUpdate={handleUpdate}
      />
      <CareerImagesViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        data={selectedImage}
      />
    </div>
  );
};

export default CareerImagesMain;
