import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import { getAllLocations, deleteLocation } from '../../../Api';
import LocationAdd from '../../Components/Common/LocationAdd';
import LocationEdit from '../../Components/Common/LocationEdit';

const LocationsMain = () => {
  const [locations, setLocations] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await getAllLocations();
      setLocations(res.data);
    } catch (error) {
      toast.error('Failed to fetch locations');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
    });

    if (confirm.isConfirmed) {
      try {
        await deleteLocation(id, token);
        toast.success('Deleted successfully');
        fetchLocations();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <ToastContainer />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Locations</h1>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <Plus size={16} /> Add Location
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Location URL</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc) => (
              <tr key={loc._id} className="border-b">
                <td className="p-3">{loc.title}</td>
                <td className="p-3 truncate max-w-xs">{loc.locationUrl}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => {
                      setSelected(loc);
                      setIsEditOpen(true);
                    }}
                    className="text-blue-500"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(loc._id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {locations.length === 0 && (
          <p className="p-4 text-gray-500 text-center">No locations found.</p>
        )}
      </div>

      <LocationAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchLocations}
      />

      <LocationEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        data={selected}
        onUpdated={fetchLocations}
      />
    </div>
  );
};

export default LocationsMain;
