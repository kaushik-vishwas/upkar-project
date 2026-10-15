// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import Vision3 from '../../assets/Vision3.png';
// import visionExp from '../../assets/visionExp1.png';
// import aboutArrow from '../../assets/Icons/aboutArrow7.png';
// import { getVisionMission } from '../../Api';
// import CountUp from './CountUp';
// import { Link } from 'react-router-dom';

// const VisionMission = () => {
//   const [visionMission, setVisionMission] = useState(null);
//   const [missionOpen, setMissionOpen] = useState(false);
//   const [visionOpen, setVisionOpen] = useState(false);
//   const token = localStorage.getItem('adminToken');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getVisionMission(token);

//         setVisionMission(data?.[0] || null);
//       } catch (error) {
//         console.error('Error fetching Vision & Mission:', error);
//       }
//     };
//     fetchData();
//   }, [token]);

//   return (
//     <div className="w-full px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 mt-10 md:mt-14 lg:mt-16">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
//         <div className="space-y-8">
//           <h2
//             className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[48px]"
//             style={{ fontFamily: "'Noto Serif JP', serif" }}
//           >
//             <span className="font-bold">Vision </span>
//             <span className="font-light">& Mission</span>
//           </h2>

//           <p className="text-[#000000] text-base sm:text-lg md:text-xl lg:text-[24px] font-[Figtree] font-light leading-snug sm:leading-relaxed">
//             {visionMission?.description ||
//               'Our core values are centered on integrity and trust, upholding transparency and ethical practices in every interaction. We are driven by a commitment to quality and craftsmanship.'}
//           </p>

//           <div className="border-t border-gray-300 pt-6">
//             <button
//               onClick={() => setMissionOpen(!missionOpen)}
//               className="w-full flex items-center justify-between text-left"
//             >
//               <h3 className="text-[#000000] text-lg sm:text-xl md:text-2xl lg:text-[24px] font-[Figtree] font-bold">
//                 Our Mission
//               </h3>
//               {missionOpen ? (
//                 <ChevronUp className="w-5 h-5" />
//               ) : (
//                 <ChevronDown className="w-5 h-5" />
//               )}
//             </button>
//             {missionOpen && (
//               <p className="mt-4 text-[#000000] text-base sm:text-lg md:text-xl lg:text-[24px] font-[Figtree] font-light leading-snug sm:leading-relaxed">
//                 {visionMission?.missionText ||
//                   'It is to consistently deliver exceptional homes and build lasting relationships based on trust, quality, and a commitment to customer satisfaction.'}
//               </p>
//             )}
//           </div>

//           <div className="border-t border-gray-300 pt-6">
//             <button
//               onClick={() => setVisionOpen(!visionOpen)}
//               className="w-full flex items-center justify-between text-left"
//             >
//               <h3 className="text-[#000000] text-lg sm:text-xl md:text-2xl lg:text-[24px] font-[Figtree] font-bold">
//                 Our Vision
//               </h3>
//               {visionOpen ? (
//                 <ChevronUp className="w-5 h-5" />
//               ) : (
//                 <ChevronDown className="w-5 h-5" />
//               )}
//             </button>
//             {visionOpen && (
//               <p className="mt-4 text-[#000000] text-base sm:text-lg md:text-xl lg:text-[24px] font-[Figtree] font-light leading-snug sm:leading-relaxed">
//                 {visionMission?.visionText ||
//                   'To be the most trusted and innovative real estate developer, creating sustainable communities that enhance the quality of life for generations to come.'}
//               </p>
//             )}
//           </div>

//           <div className="mt-8">
//             <Link to="/aboutus">
//               <img
//                 src={aboutArrow}
//                 alt="Know more about us"
//                 className="w-40 sm:w-45 md:w-50 lg:w-56 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
//               />
//             </Link>
//           </div>
//         </div>

//         <div className="relative">
//           <div className="rounded-2xl overflow-hidden shadow-xl">
//             <img
//               src={visionMission?.image || Vision3}
//               alt="Vision & Mission"
//               className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[480px] object-cover"
//             />
//             <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-6">
//               <div className="relative w-32 sm:w-40 md:w-48 lg:w-56">
//                 <img
//                   src={visionExp}
//                   alt="Years of Experience"
//                   className="w-full rounded-xl shadow-lg"
//                 />
//                 <div className="absolute inset-0 flex flex-col justify-center items-center px-2">
//                   <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold text-white">
//                     {visionMission?.totalExperience?.split(' ')[0] ||
//                       visionMission?.stats?.[0]?.number ||
//                       '10+'}
//                   </h3>
//                   <p className="text-xs sm:text-sm md:text-base font-[Figtree] text-white font-medium leading-snug whitespace-pre-line text-center">
//                     {visionMission?.totalExperience
//                       ?.replace(
//                         visionMission?.totalExperience?.split(' ')[0],
//                         '',
//                       )
//                       .trim() ||
//                       visionMission?.stats?.[0]?.label ||
//                       'Years of experience'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 mt-20 lg:mt-28 border-t border-[#000000]/10">
//         {visionMission?.stats?.map((stat, index) => (
//           <div
//             key={index}
//             className="relative flex flex-col items-center text-center px-4 sm:px-8 py-8"
//           >
//             <div
//               className="text-[#000000] font-[Noto Serif JP] font-bold text-3xl sm:text-4xl md:text-[48px]"
//               style={{ fontFamily: "'Noto Serif JP', serif" }}
//             >
//               <CountUp target={stat.number} duration={3000} />
//             </div>
//             <div className="text-[#000000] font-[Figtree] text-sm sm:text-base md:text-[16px] leading-snug mt-1 whitespace-pre-line">
//               {stat.label}
//             </div>

//             {index % 2 === 0 && index !== visionMission.stats.length - 1 && (
//               <div className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2 h-24 border-r border-[#000000]" />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VisionMission;

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import Vision3 from '../../assets/Vision3.png';
import visionExp from '../../assets/visionExp1.png';
import aboutArrow from '../../assets/Icons/aboutArrow8.png';
import { getVisionMission } from '../../Api';
import CountUp from './CountUp';
import { Link } from 'react-router-dom';

const VisionMission = () => {
  const [visionMission, setVisionMission] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);
  const [visionOpen, setVisionOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVisionMission(token);
        setVisionMission(data?.[0] || null);
      } catch (error) {
        console.error('Error fetching Vision & Mission:', error);
      }
    };
    fetchData();
  }, [token]);

  // Section fade-in
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
  }, []);

  // Floating animation keyframes
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes floatPremium {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div
      className="w-full px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 mt-10 md:mt-14 lg:mt-16"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT CONTENT */}
        <div className="space-y-8">
          <h2
            className="mb-6 text-3xl sm:text-4xl font-figtree text-[#2D5C3A]  md:text-5xl lg:text-[48px]"
            // style={{ fontFamily: "'Noto Serif JP', serif" }}
          >
            <span className="font-semibold">Vision </span>
            <span className="font-semibold">& Mission</span>
          </h2>

          <p className="text-[#000000] text-base sm:text-lg md:text-xl lg:text-xl text-justify font-[Figtree] font-medium ">
            {visionMission?.description ||
              'Our core values are centered on integrity and trust, upholding transparency and ethical practices in every interaction. We are driven by a commitment to quality and craftsmanship.'}
          </p>

          {/* MISSION */}
          <div className="border-t border-gray-300 pt-6">
            <button
              onClick={() => setMissionOpen(!missionOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-[#2D5C3A] text-lg sm:text-xl md:text-2xl lg:text-[24px] font-[Figtree] font-bold">
                Our Mission
              </h3>

              <ChevronDown
                className="w-5 h-5"
                style={{
                  transform: missionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.4s ease',
                }}
              />
            </button>

            <div
              style={{
                maxHeight: missionOpen ? '300px' : '0px',
                opacity: missionOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <p className="mt-4 text-[#000000] text-base text-justify sm:text-lg md:text-xl lg:text-xl font-[Figtree] ">
                {visionMission?.missionText ||
                  'It is to consistently deliver exceptional homes and build lasting relationships based on trust, quality, and a commitment to customer satisfaction.'}
              </p>
            </div>
          </div>

          {/* VISION */}
          <div className="border-t border-gray-300 pt-6">
            <button
              onClick={() => setVisionOpen(!visionOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <h3 className="text-[#2D5C3A] text-lg sm:text-xl md:text-2xl lg:text-[24px] font-[Figtree] font-bold">
                Our Vision
              </h3>

              <ChevronDown
                className="w-5 h-5"
                style={{
                  transform: visionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.4s ease',
                }}
              />
            </button>

            <div
              style={{
                maxHeight: visionOpen ? '300px' : '0px',
                opacity: visionOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <p className="mt-4 text-[#000000] text-base text-justify sm:text-lg md:text-xl lg:text-xl font-[Figtree]  ">
                {visionMission?.visionText ||
                  'To be the most trusted and innovative real estate developer, creating sustainable communities that enhance the quality of life for generations to come.'}
              </p>
            </div>
          </div>

          {/* ARROW */}
          <div className="mt-8">
            <Link to="/aboutus">
              <img
                src={aboutArrow}
                alt="Know more about us"
                className="w-40 sm:w-45 md:w-50 lg:w-56 h-auto cursor-pointer hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src={visionMission?.image || Vision3}
              alt="Vision & Mission"
              className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[480px] object-cover"
              style={{
                transition: 'transform 1.2s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            />

            {/* EXPERIENCE BADGE */}
            <div className="absolute -bottom-4 right-0 sm:-bottom-6 sm:-right-4 md:-bottom-8 md:-right-6">
              <div
                className="relative w-32 sm:w-40 md:w-48 lg:w-56"
                style={{
                  animation: 'floatPremium 4s ease-in-out infinite',
                }}
              >
                <img
                  src={visionExp}
                  alt="Years of Experience"
                  className="w-full rounded-xl shadow-lg"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center px-2">
                  {/* <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold text-white">
                    {visionMission?.totalExperience?.split(' ')[0] ||
                      visionMission?.stats?.[0]?.number ||
                      '10+'}
                  </h3> */}
                  <h3 className="text-3xl sm:text-3xl md:text-6xl font-bold text-white">
                    <CountUp
                      target={
                        visionMission?.totalExperience?.split(' ')[0] ||
                        visionMission?.stats?.[0]?.number ||
                        '10'
                      }
                      duration={1000}
                    />
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base font-[Figtree] text-white font-medium leading-snug whitespace-pre-line text-center">
                    {visionMission?.totalExperience
                      ?.replace(
                        visionMission?.totalExperience?.split(' ')[0],
                        '',
                      )
                      .trim() ||
                      visionMission?.stats?.[0]?.label ||
                      'Years of experience'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 mt-20 lg:mt-28 border-t border-[#000000]/10">
        {visionMission?.stats?.map((stat, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center px-4 sm:px-8 py-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
              transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.2}s`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'translateY(-6px)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'translateY(0px)')
            }
          >
            <div
              className="text-[#2D5C3A]  font-figtree font-bold text-3xl sm:text-4xl md:text-[48px]"
              // style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {/* <CountUp target={stat.number} duration={1000} /> */}
              <CountUp
                target={parseInt(stat.number.replace(/,/g, ''))}
                suffix={stat.number.includes('+') ? '+' : ''}
              />
            </div>

            <div className="text-[#000000] font-[Figtree] font-medium text-sm sm:text-base md:text-base lg:text-base leading-snug mt-1 whitespace-pre-line">
              {stat.label}
            </div>

            {index !== visionMission.stats.length - 1 && (
              <div className="absolute hidden md:block right-0 top-1/2 -translate-y-1/2 h-24 border-r border-[#000000]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisionMission;
