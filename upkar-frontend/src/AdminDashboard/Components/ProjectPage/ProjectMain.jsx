import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ProjectAdd from '../../Components/Common/ProjectMainAdd';
import ProjectEdit from '../../Components/Common/ProjectMainEdit';
import ProjectViewModal from '../../Components/ViewModals/ProjectPage/ProjectView';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import 'sweetalert2/dist/sweetalert2.min.css';
import { getAllProjectMain, deleteProjectMain } from '../../../Api';

const ProjectMain = () => {
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
      const data = await getAllProjectMain(token);
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects!');
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
        await deleteProjectMain(id, token);
        setProjects(projects.filter((proj) => proj._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project!');
      }
    }
  };

  const truncate = (text, length = 20) =>
    text?.length > length ? text.slice(0, length) + '...' : text;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Project Main</h1>
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
                Customer Heading
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Customer Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Rating
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-4 py-2">{truncate(project.heading)}</td>
                <td className="px-4 py-2">{truncate(project.description)}</td>
                <td className="px-4 py-2">
                  {truncate(project.customerHeading)}
                </td>
                <td className="px-4 py-2">
                  {truncate(project.customerDescription)}
                </td>
                <td className="px-4 py-2">{truncate(project.ratingText)}</td>
                <td className="px-4 py-2 flex gap-2">
                  {/* View Button */}
                  <button
                    className="text-green-500 hover:text-green-700"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsViewOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsEditOpen(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(project._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ProjectAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onProjectAdded={fetchProjects}
      />
      <ProjectEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        onProjectUpdated={fetchProjects}
      />
      <ProjectViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default ProjectMain;
