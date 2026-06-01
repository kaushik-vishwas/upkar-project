import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../Api';
import ProjectBtn1 from '../../assets/Icons/projectBtn11.png';
import ProjectBtn2 from '../../assets/Icons/projectBtn22.png';
import ProjectBtn3 from '../../assets/Icons/projectBtn33.png';

const useInView = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

const AnimateOnScroll = ({ children }) => {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const data = await getProjects(token);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getButtonImage = (type) => {
    switch (type?.toLowerCase()) {
      case 'ongoing':
        return ProjectBtn1;
      case 'upcoming':
        return ProjectBtn2;
      case 'completed':
        return ProjectBtn3;
      default:
        return ProjectBtn1;
    }
  };

  const getButtonText = (type) => {
    switch (type?.toLowerCase()) {
      case 'ongoing':
        return 'Explore Ongoing Projects';
      case 'upcoming':
        return 'Explore Upcoming Projects';
      case 'completed':
        return 'Explore Completed Projects';
      default:
        return 'Explore Projects';
    }
  };

  const getProjectLink = (type) => {
    switch (type?.toLowerCase()) {
      case 'ongoing':
        return '/ongoing-projects';
      case 'upcoming':
        return '/upcoming-projects';
      case 'completed':
        return '/completed-projects';
      default:
        return '/projects';
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
        <h2
          className="mb-4 lg:mb-12 text-3xl sm:text-3xl md:text-4xl font-figtree lg:text-4xl font-light leading-tight"
          // style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          <span className="font-normal">Our </span>
          <span className="font-semibold">Projects</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-600">No projects found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="flex items-center gap-4 mb-8 lg:mb-12">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-figtree text-center whitespace-nowrap">
          <span className="font-normal">Our </span>
          <span className="font-semibold text-[#2D5C3A]">Projects</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      {/* Desktop View */}
      <div className="space-y-20 hidden lg:block">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <AnimateOnScroll key={project._id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className={`space-y-6 ${!isEven ? 'order-2' : ''}`}>
                  <h2
                    className="sm:text-3xl font-medium  font-figtree md:text-4xl lg:text-4xl  text-gray-800 leading-tight"
                    style={{
                      // fontFamily: "'Noto Serif JP', serif",

                      color: '#000000',
                    }}
                    dangerouslySetInnerHTML={{ __html: project.heading }}
                  />
                  <p
                    className="text-sm sm:text-base text-justify font-figtree lg:text-xl"
                    style={{
                      // fontFamily: "'Figtree', sans-serif",
                      fontWeight: 300,
                      fontSize: '20px',
                      color: '#000000',
                      lineHeight: '1.2',
                    }}
                  >
                    {project.description}
                  </p>
                  <ul
                    className={`space-y-2 text-sm sm:text-base lg:text-lg ${
                      !isEven ? 'lg:pl-80 ' : ''
                    }`}
                  >
                    {project.bulletPoints?.map((point, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: 'Figtree',
                          fontWeight: 300,
                          fontSize: '18px',
                          color: '#000000',
                          lineHeight: '1.6',
                        }}
                        className="flex items-start"
                      >
                        <span className="mr-2 flex-shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <ul
                    className={`space-y-2 text-sm sm:text-base lg:text-lg 
  ${!isEven ? 'lg:ml-auto lg:text-right' : ''}
  `}
                  >
                    {project.bulletPoints?.map((point, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontFamily: 'Figtree',
                          fontWeight: 300,
                          fontSize: '18px',
                          color: '#000000',
                          lineHeight: '1.6',
                        }}
                        className={`flex items-start ${!isEven ? 'lg:justify-end' : ''}`}
                      >
                        {!isEven ? null : (
                          <span className="mr-2 flex-shrink-0">•</span>
                        )}

                        <span>{point}</span>

                        {!isEven && (
                          <span className="ml-2 flex-shrink-0">•</span>
                        )}
                      </li>
                    ))}
                  </ul> */}
                  <div className={`mt-4 ${!isEven ? 'pl-64' : ''}`}>
                    <Link to={getProjectLink(project.type)}>
                      <img
                        src={getButtonImage(project.type)}
                        alt={getButtonText(project.type)}
                        className="w-45 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </div>

                <div className={`relative ${!isEven ? 'order-1' : ''}`}>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={project.image}
                      alt={project.heading}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className={`absolute bottom-0 bg-[#2D5C3A] rounded-lg shadow-lg 
  p-2 sm:p-3 lg:p-4 
  w-[75%] sm:w-[65%] lg:w-[60%]
  ${index % 2 === 0 ? '-left-40 sm:-left-48 lg:-left-60' : '-right-40 sm:-right-48 lg:-right-60'}
  `}
                  >
                    <p
                      className="text-justify text-white text-[12px] sm:text-sm lg:text-sm leading-tight sm:leading-snug"
                      style={{
                        fontFamily: 'Figtree',
                        fontWeight: 300,
                        margin: 0,
                      }}
                    >
                      {project.boxMessage}
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          );
        })}
      </div>

      {/* Mobile View */}
      <div className="space-y-12 sm:space-y-16 block lg:hidden">
        {projects.map((project) => (
          <AnimateOnScroll key={project._id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pb-10 sm:pb-12">
              <div className="space-y-6">
                <h2
                  className="text-3xl sm:text-4xl font-figtree md:text-5xl lg:text-[48px] font-light leading-tight"
                  // style={{ fontFamily: "'Noto Serif JP', serif" }}
                  dangerouslySetInnerHTML={{ __html: project.heading }}
                />

                <p className="text-[#000000] text-base text-justify sm:text-lg md:text-xl lg:text-[24px] font-[Figtree] font-light leading-snug sm:leading-relaxed">
                  {project.description}
                </p>

                <ul className="space-y-2">
                  {project.bulletPoints?.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-[#000000] text-base sm:text-lg md:text-xl lg:text-[24px] font-[Figtree] font-light leading-snug sm:leading-relaxed"
                    >
                      <span className="mr-2">•</span> {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <Link to={getProjectLink(project.type)}>
                    <img
                      src={getButtonImage(project.type)}
                      alt={getButtonText(project.type)}
                      className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={project.image}
                    alt={project.heading}
                    className="w-full h-64 sm:h-80 md:h-full object-cover"
                  />
                </div>

                <div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] sm:w-[75%] text-justify md:w-[65%] bg-[#2D5C3A] text-white rounded-lg shadow-lg p-3 sm:p-4"
                  style={{ maxWidth: '77%' }}
                >
                  <p
                    style={{
                      fontFamily: 'Figtree',
                      fontWeight: 200,
                      fontSize: '14px',
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {project.boxMessage}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
};

export default Projects;
