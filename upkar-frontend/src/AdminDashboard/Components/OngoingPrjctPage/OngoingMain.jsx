import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import OngoingProjectAdd from '../../Components/Common/OngoingProjectAdd';
import OngoingProjectEdit from '../../Components/Common/OngoingProjectEdit';
import OngoingProjectView from '../../Components/ViewModals/OngoingProject/OngoingProjectView';
import { getAllOngoingProjects, deleteOngoingProject } from '../../../Api';

const OngoingProjectMain = () => {
  const [projects, setProjects] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getAllOngoingProjects();
      setProjects(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch projects!');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteOngoingProject(id, token);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete project!');
      }
    }
  };

  const handleAdded = () => {
    fetchProjects();
    toast.success('Project added successfully!');
  };

  const handleUpdated = () => {
    fetchProjects();
    toast.success('Project updated successfully!');
  };

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Ongoing Projects</h1>
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
                Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Image
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((item) => (
              <tr key={item._id}>
                <td className="px-4 py-2">
                  {item.heading?.slice(0, 20)}
                  {item.heading?.length > 20 ? '...' : ''}
                </td>
                <td className="px-4 py-2">
                  {item.description?.slice(0, 20)}
                  {item.description?.length > 20 ? '...' : ''}
                </td>
                <td className="px-4 py-2">
                  <img
                    src={item.mainImage}
                    alt=""
                    className="w-20 h-12 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProject(item);
                      setIsViewOpen(true);
                    }}
                    className="text-green-500 hover:text-green-700"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProject(item);
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
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No Ongoing Projects Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <OngoingProjectAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAdded}
      />
      <OngoingProjectEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        onUpdated={handleUpdated}
      />
      <OngoingProjectView
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default OngoingProjectMain;
