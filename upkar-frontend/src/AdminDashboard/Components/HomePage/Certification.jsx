import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import CertificationAdd from '../Common/CertificationAdd';
import CertificationEdit from '../Common/CertificationEdit';
import CertificationViewModal from '../ViewModals/HomePage/CertificationView';
import { getCertifications, deleteCertification } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Certification = () => {
  const [certifications, setCertifications] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await getCertifications(token);
      setCertifications(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch certifications!');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (result.isConfirmed) {
      try {
        await deleteCertification(id, token);
        setCertifications(certifications.filter((c) => c._id !== id));
        toast.success('Certification deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete certification!');
      }
    }
  };

  const handleAddSuccess = () => {
    fetchCertifications();
    toast.success('Certification added successfully!');
  };

  const handleEditSuccess = () => {
    fetchCertifications();
    toast.success('Certification updated successfully!');
  };

  const truncateText = (text) => {
    if (!text) return '';
    return text.length > 40 ? text.substring(0, 40) + '...' : text;
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Certifications</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <div className="min-w-[900px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[250px]">
                  Heading
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[300px]">
                  Content
                </th>

                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                  Icon
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[140px]">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[160px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {certifications.map((cert) => (
                <tr key={cert._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {truncateText(cert.heading)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {truncateText(cert.content)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={cert.icon}
                      alt={cert.heading}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(cert.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedCert(cert);
                        setIsViewOpen(true);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCert(cert);
                        setIsEditOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(cert._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {certifications.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No Certifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CertificationAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAddSuccess}
      />
      <CertificationEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        certification={selectedCert}
        onUpdated={handleEditSuccess}
      />
      <CertificationViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        certification={selectedCert}
      />
    </div>
  );
};

export default Certification;
