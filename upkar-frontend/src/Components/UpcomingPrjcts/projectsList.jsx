import React, { useEffect, useState, useRef } from 'react';
import { Search, Hand, Headset, ChevronLeft, ChevronRight } from 'lucide-react';
import { FiChevronDown } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAllProjects, getAllCategories } from '../../Api';
import { FaLocationDot } from 'react-icons/fa6';

const UpcomingProjectsList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        const projectList = Array.isArray(res) ? res : res.projects;

        if (projectList && projectList.length > 0) {
          // const upcomingProjects = projectList.filter(
          //   (p) => p.projectStatus === 'upcoming',
          // );
          const upcomingProjects = projectList.filter(
            (p) => p.projectStatus === 'upcoming' && p.isVisible !== false,
          );
          setProjects(upcomingProjects);
        }
      } catch (error) {
        console.error('Error fetching upcoming projects:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res.success) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || project.projectType === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProjectsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setProjectsPerPage(6);
      } else {
        setProjectsPerPage(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentPage]);

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div ref={topRef} className="w-full py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Projects"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 text-[13px]"
              />
            </div>

            <div className="relative w-full">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(0);
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none pr-10 text-[13px]"
              >
                <option value="All">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.categoryName}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          {currentProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-[14px] font-medium text-gray-500">
                No upcoming projects found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProjects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project._id)}
                  className=" bg-white rounded-xl overflow-hidden font-figtree shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03]  border-gray-300 hover:border-[#2D5C3A] border-2 "
                >
                  <div className="overflow-hidden">
                    <img
                      src={project.propertyImages?.[0]}
                      alt={project.projectName}
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-black">
                      {project.projectName}
                    </h3>

                    <div className="flex justify-center items-center gap-2 mt-2 text-black">
                      <FaLocationDot size={16} />
                      <span className="text-base">{project.location}</span>
                    </div>
                    <div className="flex justify-center gap-3 mt-3">
                      <div className="relative group">
                        <div className="w-10 h-10 bg-[#2D5C3A] rounded-full flex items-center justify-center text-white shadow-md transition hover:scale-110 cursor-pointer">
                          <Hand size={20} />
                        </div>

                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                          I’m Interested
                        </span>
                      </div>

                      <div className="relative group">
                        <a href="tel:8880796796">
                          <div className="w-10 h-10 bg-[#2D5C3A] rounded-full flex items-center justify-center text-white shadow-md transition hover:scale-110 cursor-pointer">
                            <Headset size={20} />
                          </div>
                        </a>

                        <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300">
                          Call
                        </span>
                      </div>
                    </div>

                    <div className="w-72 h-[1px] bg-gray-500 mx-auto my-6"></div>

                    <p className="text-base  text-black">
                      {project.unitConfiguration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 pb-10">
            {/* Previous */}
            <button
              onClick={() =>
                currentPage > 0 && setCurrentPage((prev) => prev - 1)
              }
              disabled={currentPage === 0}
              className="p-2 rounded-full bg-[#2D5C3A] text-white disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Number */}
            <span className="text-[15px] font-medium">{currentPage + 1}</span>

            {/* Next */}
            <button
              onClick={() =>
                currentPage < totalPages - 1 &&
                setCurrentPage((prev) => prev + 1)
              }
              disabled={currentPage === totalPages - 1}
              className="p-2 rounded-full bg-[#2D5C3A] text-white disabled:opacity-40"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingProjectsList;
