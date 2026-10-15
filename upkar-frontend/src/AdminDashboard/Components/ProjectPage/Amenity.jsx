import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AmenityAdd from '../Common/AmenityAdd';
import AmenityEdit from '../Common/AmenityEdit';
import AmenityViewModal from '../../Components/ViewModals/ProjectPage/AmenityView';
import { getAmenitiesAPI, deleteAmenityAPI } from '../../../Api';
import 'sweetalert2/dist/sweetalert2.min.css';

const Amenity = () => {
  const [amenities, setAmenities] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);

  const token = localStorage.getItem('adminToken');

  const fetchAmenities = async () => {
    try {
      const data = await getAmenitiesAPI();
      setAmenities(data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
      toast.error('Failed to fetch amenities!');
    }
  };

  useEffect(() => {
    fetchAmenities();
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
        await deleteAmenityAPI(id, token);
        fetchAmenities();
        toast.success('Amenity deleted successfully!');
      } catch (error) {
        console.error('Error deleting amenity:', error);
        toast.error('Failed to delete amenity!');
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  const handleRefresh = () => fetchAmenities();

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Amenitys</h1>
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
                Icon
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {amenities.length > 0 ? (
              amenities.map((a) => (
                <tr key={a._id}>
                  <td className="px-4 py-2">
                    <img
                      src={a.icon}
                      alt={a.heading}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{truncate(a.heading)}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelectedAmenity(a);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedAmenity(a);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(a._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No amenities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AmenityAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        refresh={handleRefresh}
      />
      <AmenityEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        amenity={selectedAmenity}
        refresh={handleRefresh}
      />
      <AmenityViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        amenity={selectedAmenity}
      />
    </div>
  );
};

export default Amenity;
