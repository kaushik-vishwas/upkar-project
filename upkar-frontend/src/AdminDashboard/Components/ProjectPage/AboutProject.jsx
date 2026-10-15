import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AboutProjectAdd from '../Common/AboutProjectAdd';
import AboutProjectEdit from '../Common/AboutProjectEdit';
import AboutProjectViewModal from '../../Components/ViewModals/ProjectPage/AboutProjectView';
import { getAboutProjectsAPI, deleteAboutProjectAPI } from '../../../Api';

const AboutProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const data = await getAboutProjectsAPI(token);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch About Projects!');
    }
  };

  useEffect(() => {
    fetchProjects();
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
        const token = localStorage.getItem('adminToken');
        await deleteAboutProjectAPI(id, token);
        toast.success('Deleted successfully!');
        fetchProjects();
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || 'Failed to delete About Project!'
        );
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">About Projects</h1>
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
                About Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                About Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                RE Raising
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                RE Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                No Broker Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Builder Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.length > 0 ? (
              projects.map((p) => (
                <tr key={p._id}>
                  <td className="px-4 py-2">{truncate(p.aboutHeading)}</td>
                  <td className="px-4 py-2">{truncate(p.aboutDescription)}</td>
                  <td className="px-4 py-2">{truncate(p.reRaising)}</td>
                  <td className="px-4 py-2">{truncate(p.reRadescription)}</td>
                  <td className="px-4 py-2">{truncate(p.noBrokerHeading)}</td>
                  <td className="px-4 py-2">{truncate(p.builderHeading)}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        setSelectedProject(p);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedProject(p);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(p._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No About Projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AboutProjectAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        refresh={fetchProjects}
      />
      <AboutProjectEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        refresh={fetchProjects}
      />
      <AboutProjectViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default AboutProjectManagement;
