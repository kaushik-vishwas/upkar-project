import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import CompletedProjectAdd from '../../Components/Common/CompletedProjectAdd';
import CompletedProjectEdit from '../../Components/Common/CompletedProjectEdit';
import CompletedProjectViewModal from '../../Components/ViewModals/CompletedProject/CompletedProjectView';
import { getAllCompletedProjects, deleteCompletedProject } from '../../../Api';

const CompletedProjectMain = () => {
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
      const response = await getAllCompletedProjects();
      const list = Array.isArray(response.data) ? response.data : [];
      setProjects(list);
    } catch (error) {
      console.error('Error fetching completed projects:', error);
      toast.error('Failed to fetch projects!');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await deleteCompletedProject(id, token);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting:', error);
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

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={1500} />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Completed Projects</h1>
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
                <td className="px-4 py-2">{truncate(item.heading)}</td>
                <td className="px-4 py-2">{truncate(item.description)}</td>
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
                  No Completed Projects Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CompletedProjectAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAdded}
      />

      <CompletedProjectEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        onUpdated={handleUpdated}
      />

      <CompletedProjectViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default CompletedProjectMain;
