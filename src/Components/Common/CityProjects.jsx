import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Hand, Headset } from 'lucide-react';
import { getAllProjects } from '../../Api';
import Navbar from '../../Components/Common/NavbarHome';
import { FaLocationDot } from 'react-icons/fa6';

const CityProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const topRef = useRef(null);

  const city = searchParams.get('city');

  const [currentPage, setCurrentPage] = useState(0);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  useEffect(() => {
    if (city) {
      fetchProjects();
    }
  }, [city]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [city]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProjectsPerPage(3);
      } else {
        setProjectsPerPage(6);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      const projectList = Array.isArray(res) ? res : res.projects;

      const filtered = projectList.filter((project) => {
        const location = project.location?.toLowerCase() || '';

        if (!project.isVisible) return false;

        if (city === 'bengaluru') {
          return (
            location.includes('bangalore') ||
            location.includes('banga') ||
            location.includes('Banga') ||
            location.includes('Bangalore') ||
            location.includes('Attib') ||
            location.includes('attib') ||
            location.includes('Bengaluru') ||
            location.includes('bengaluru')
          );
        }

        if (city === 'hosur') {
          return (
            location.includes('hosur') ||
            location.includes('tamil') ||
            location.includes('tamilnadu') ||
            location.includes('Tamilnadu') ||
            location.includes('Hosur') ||
            location.includes('tamil') ||
            location.includes('tamil nadu')
          );
        }

        return false;
      });

      setProjects(filtered);
      setCurrentPage(0);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const startIndex = currentPage * projectsPerPage;

  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage,
  );

  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  return (
    <>
      <Navbar />
      <div ref={topRef} className="pt-28 w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-figtree mb-10 text-center capitalize">
            <span className="">{city}</span>{' '}
            <span className="font-semibold text-[#2D5C3A]">Projects</span>
          </h2>

          {currentProjects.length === 0 ? (
            <p className="text-center text-gray-500 font-figtree">
              No projects found
            </p>
          ) : (
            <>
              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjects.map((project) => (
                  <div
                    key={project._id}
                    onClick={() => handleProjectClick(project._id)}
                    className="relative bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03] border-2 border-gray-300 hover:border-[#2D5C3A]"
                  >
                    {/* Status Badge */}
                    {project.projectStatus && (
                      <div className="absolute top-3 font-figtree right-3 bg-[#2D5C3A] text-white text-xs font-semibold px-3 py-2 rounded-full capitalize shadow">
                        {project.projectStatus}
                      </div>
                    )}

                    <div className="overflow-hidden">
                      <img
                        src={project.propertyImages?.[0]}
                        alt={project.projectName}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <div className="p-6 text-center font-figtree">
                      <h3 className="text-xl font-semibold text-black">
                        {project.projectName}
                      </h3>

                      {/* Location */}
                      <div className="flex justify-center items-center gap-2 mt-2 text-black">
                        <FaLocationDot size={16} />
                        <span className="text-base">{project.location}</span>
                      </div>

                      {/* Action Icons for ongoing/upcoming */}
                      {(project.projectStatus === 'ongoing' ||
                        project.projectStatus === 'upcoming') && (
                        <div className="flex justify-center gap-3 mt-3">
                          <div className="relative group">
                            <div className="w-10 h-10 bg-[#2D5C3A] rounded-full flex items-center justify-center text-white shadow-md transition hover:scale-110">
                              <Hand size={20} />
                            </div>

                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              I’m Interested
                            </span>
                          </div>

                          <div className="relative group">
                            <a href="tel:8880796796">
                              {' '}
                              <div className="w-10 h-10 bg-[#2D5C3A] rounded-full flex items-center justify-center text-white shadow-md transition hover:scale-110">
                                <Headset size={20} />
                              </div>
                            </a>
                            <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                              Call
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="w-72 h-[1px] bg-gray-500 mx-auto my-6"></div>

                      <p className="text-base  text-black">
                        {project.unitConfiguration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-10">
                  <button
                    onClick={() => {
                      if (currentPage > 0) {
                        setCurrentPage((prev) => prev - 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage === 0}
                    className="p-2 rounded-full bg-[#2D5C3A] text-white disabled:opacity-40"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-[15px] font-medium">
                    {currentPage + 1}
                  </span>

                  <button
                    onClick={() => {
                      if (currentPage < totalPages - 1) {
                        setCurrentPage((prev) => prev + 1);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    disabled={currentPage === totalPages - 1}
                    className="p-2 rounded-full bg-[#2D5C3A] text-white disabled:opacity-40"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CityProjects;
