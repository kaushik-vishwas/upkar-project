// import ProjectBtn from '../../assets/Icons/ProjectBtn7.png';
// import { Link } from 'react-router-dom';

// const Map = () => {
//   return (
//     <div className="w-full max-w-7xl mx-auto px-4 lg:px-10 mt-12 lg:mt-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//         <div className="rounded-2xl overflow-hidden shadow-xl">
//           <iframe
//             title="Upkar Towers Location"
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.11610951081!2d77.56036951969323!3d12.939408280942776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159423739445%3A0x4197a95cbd5e5aaa!2sUPKAR%20TOWERS!5e0!3m2!1sen!2som!4v1733050000000!5m2!1sen!2som"
//             className="w-full h-60 sm:h-72 md:h-80 lg:h-[400px] border-0"
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>

//         <div className="space-y-4 sm:space-y-6">
//           <p className="text-[#000000] text-base sm:text-lg md:text-xl lg:text-xl font-[Figtree] font-medium">
//             Explore our portfolio of exceptional properties and take the first
//             step toward a new life.
//           </p>

//           <div className="mt-4">
//             <Link to="/ongoing-projects">
//               <img
//                 src={ProjectBtn}
//                 alt="Explore Projects"
//                 className="w-36 sm:w-40 md:w-48 lg:w-56 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Map;
import React, { useState } from 'react';
import mapImage from '../../assets/bengluru.png';
import PinfImage from '../../assets/pin.png';

const projects = [
  {
    id: 1,
    name: 'Upkar Galaxy',
    location: 'Mysore Road',
    link: 'https://maps.app.goo.gl/ErLNBvmVUpuZjZE48',
    top: '68%',
    left: '18%',
  },
  {
    id: 3,
    name: 'Upkar Symphony',
    location: 'Indlabele',
    link: 'https://maps.app.goo.gl/vpH3SYtMAmFJ9NhY6',
    top: '58%',
    left: '72%',
  },
  {
    id: 2,
    name: 'Upkar Galaxy Phase 2',
    location: 'Huluvenahalli',
    link: 'https://maps.app.goo.gl/YYaSxWwoNdjubLaGA',
    top: '45%',
    left: '48%',
  },
  {
    id: 4,
    name: 'Upkar Habitat Phase 3',
    location: 'Dasanapura',
    link: 'https://maps.app.goo.gl/kUzTrpPGdTPKaS43A',
    top: '20%',
    left: '25%',
  },
];

const Map = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <section className="bg-gray-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT SIDE */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-figtree font-semibold text-black mb-6 md:mb-8">
              <span className="text-[#2D5C3A] font-semibold">
                Interactive Map
              </span>
            </h2>

            <div className="space-y-3 sm:space-y-4 md:space-y-5">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`block w-full lg:w-auto text-center lg:text-left text-sm sm:text-base md:text-lg font-figtree transition-all duration-300 ${
                    activeProject.id === project.id
                      ? 'text-[#2D5C3A] font-semibold'
                      : 'text-gray-600 hover:text-[#2D5C3A]'
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
              <img
                src={mapImage}
                alt="Project Map"
                className="w-full h-auto object-contain"
              />

              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute group"
                  style={{
                    top: project.top,
                    left: project.left,
                    transform: 'translate(-50%, -100%)',
                  }}
                  onMouseEnter={() => setActiveProject(project)}
                >
                  <img
                    src={PinfImage}
                    alt={project.name}
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 transition-all duration-300 ${
                      activeProject.id === project.id ? 'active-pin' : ''
                    }`}
                  />

                  {/* Tooltip */}
                  <div className="absolute left-6 sm:left-8 top-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                    <div className="bg-white rounded-lg shadow-xl px-3 py-2 whitespace-nowrap">
                      <p className="font-semibold text-[#2D5C3A] text-xs sm:text-sm">
                        {project.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-500">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;
