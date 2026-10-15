import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ProjectAdd from '../Common/ProjectAdd';
import ProjectEdit from '../Common/ProjectEdit';
import ProjectViewModal from '../ViewModals/HomePage/ProjectView';
import { getProjects, deleteProject } from '../../../Api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Projects = () => {
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
      const data = await getProjects(token);
      setProjects(data);
    } catch (error) {
      console.error(error);
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
        await deleteProject(id, token);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete project!');
      }
    }
  };

  const handleProjectAdded = () => {
    fetchProjects();
    toast.success('Project added successfully!');
  };

  const handleProjectUpdated = () => {
    fetchProjects();
    toast.success('Project updated successfully!');
  };

  const truncateText = (text = '') => {
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="overflow-x-auto w-full bg-white rounded shadow">
        <div className="min-w-[1300px]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[180px]">
                  Heading
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[250px]">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[220px]">
                  Bullet Points
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[200px]">
                  Box Message
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                  Image
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
              {projects.map((project) => (
                <tr key={project._id}>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    {truncateText(project.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[180px]">
                    {truncateText(project.heading)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[250px]">
                    {truncateText(project.description)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[220px]">
                    {project.bulletPoints?.map((bp, i) => (
                      <div key={i}>• {truncateText(bp)}</div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[200px]">
                    {truncateText(project.boxMessage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                    <img
                      src={project.image}
                      alt={project.heading}
                      className="w-20 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap min-w-[140px]">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3 min-w-[160px]">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsViewOpen(true);
                      }}
                      className="text-green-600 hover:text-green-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsEditOpen(true);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-4 text-gray-500">
                    No Projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ProjectAdd
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onProjectAdded={handleProjectAdded}
      />
      <ProjectEdit
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={selectedProject}
        onUpdate={handleProjectUpdated}
      />
      <ProjectViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

export default Projects;
