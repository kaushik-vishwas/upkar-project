import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'sweetalert2/dist/sweetalert2.min.css';
import FeatureAdd from '../../Components/Common/FeatureAdd';
import FeatureEdit from '../../Components/Common/FeatureEdit';
import FeatureViewModal from '../../Components/ViewModals/ProjectPage/FeatureView';
import { getAllFeatures, deleteFeature } from '../../../Api';

const Feature = () => {
  const [features, setFeatures] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const data = await getAllFeatures(token);
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching features:', error);
      toast.error('Failed to fetch features!');
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
        await deleteFeature(id, token);
        setFeatures(features.filter((feat) => feat._id !== id));
        toast.success('Feature deleted successfully!');
      } catch (error) {
        console.error('Error deleting feature:', error);
        toast.error('Failed to delete feature!');
      }
    }
  };

  const handleFeatureUpdated = () => {
    fetchFeatures();
    toast.success('Feature updated successfully!');
  };

  const handleFeatureAdded = () => {
    fetchFeatures();
    toast.success('Feature added successfully!');
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Features</h1>
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
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Main Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Icons
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {features.length > 0 ? (
              features.map((feature) => (
                <tr key={feature._id}>
                  <td className="px-4 py-2">{truncate(feature.description)}</td>
                  <td className="px-4 py-2">
                    <img
                      src={feature.mainImage}
                      alt="Feature"
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {feature.icons?.map((icon, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        {icon.icon && (
                          <img
                            src={icon.icon}
                            alt={icon.iconTitle || 'Icon'}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <small>{truncate(icon.iconTitle)}</small>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(feature.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelectedFeature(feature);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedFeature(feature);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(feature._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No features found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FeatureAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onFeatureAdded={handleFeatureAdded}
      />

      <FeatureEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        feature={selectedFeature}
        onFeatureUpdated={handleFeatureUpdated}
      />

      <FeatureViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default Feature;
