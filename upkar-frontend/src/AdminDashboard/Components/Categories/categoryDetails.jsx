import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllProjects } from '../../../Api';
import AddProject from '../Projects/addProject';

const CategoryDetails = () => {
  const { id } = useParams();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, [id]);

  useEffect(() => {
    applyFilters();
  }, [projects, searchTerm, statusFilter]);

  const fetchProjects = async () => {
    try {
      const allProjects = await getAllProjects();

      if (!Array.isArray(allProjects)) {
        console.error('Projects API did not return an array');
        return;
      }

      const filtered = allProjects.filter(
        (p) =>
          p.projectType &&
          id &&
          p.projectType.toString().trim().toLowerCase() ===
            id.toString().trim().toLowerCase(),
      );

      setProjects(filtered);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const applyFilters = () => {
    let result = [...projects];

    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.projectName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.location?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter(
        (project) =>
          project.projectStatus?.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    setFilteredProjects(result);
  };

  return (
    <div
      className="bg-white shadow-sm p-6"
      style={{ fontFamily: 'Figtree, sans-serif' }}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-[20px] font-semibold mb-4">{id} Projects</h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 text-[16px] mb-4 font-medium bg-[#2D5C3A] text-white rounded-md hover:bg-[#244A30] transition"
        >
          + Add Project
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="border-b text-[20px]  text-black">
            <tr>
              <th className="px-6 py-3 text-left  font-medium">S.No</th>
              <th className="px-6 py-3 text-left font-medium">Project Name</th>
              <th className="px-6 py-3 text-left  font-medium">Location</th>
              <th className="px-6 py-3 text-left  font-medium">Price</th>
              <th className="px-6 py-3 text-left  font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr key={project._id} className="border-b  hover:bg-gray-50">
                  <td className="px-6 py-3 text-[18px] text-left">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-[18px] text-left ">
                    {project.projectName}
                  </td>
                  <td className="px-6 py-3 text-[18px] text-left">
                    {project.location}
                  </td>
                  <td className="px-6 py-3 text-[18px] text-left">
                    ₹ {project.priceStartsFrom}
                  </td>
                  <td className="px-6 py-3 text-[18px] text-left">
                    <span className="px-3 py-1 rounded-md text-[16px] bg-[#2D5C3A] text-white inline-block">
                      {project.projectStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="bg-white w-[90vw] max-w-4xl max-h-[90vh] rounded-xl shadow-2xl relative flex flex-col">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ✕
            </button>

            <div className="overflow-y-auto flex-1">
              <AddProject onClose={() => setShowAddModal(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
