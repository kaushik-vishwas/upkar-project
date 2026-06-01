// import React, { useState, useEffect } from 'react';
// import { getCertifications } from '../../Api';

// const AboutCertification = () => {
//   const [certifications, setCertifications] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(3);
//   const [isMobile, setIsMobile] = useState(false);

//   const token = localStorage.getItem('adminToken');

//   useEffect(() => {
//     const fetchCerts = async () => {
//       try {
//         const data = await getCertifications(token);
//         setCertifications(data || []);
//       } catch (error) {
//         console.error('Error fetching certifications:', error);
//       }
//     };

//     fetchCerts();
//   }, [token]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerView(1);
//         setIsMobile(true);
//       } else {
//         setItemsPerView(3);
//         setIsMobile(false);
//       }
//       setCurrentIndex(0);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const nextSlide = () => {
//     if (currentIndex + itemsPerView < certifications.length) {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="w-full bg-white px-4 lg:px-10 py-16 font-[Figtree]">
//       <div className="max-w-6xl mx-auto">
//         {/* Heading */}
//         <div className="text-center mb-14">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] ">
//             Core <span className="font-semibold text-[#2D5C3A]">Values</span>
//           </h2>
//         </div>

//         {isMobile ? (
//           <div className="space-y-6">
//             {certifications.map((cert, index) => (
//               <div
//                 key={index}
//                 className="group relative bg-[#2D5C3A] text-white rounded-3xl p-8 min-h-[280px]
//                 flex flex-col justify-between border-2 border-transparent
//                 transition-all duration-300 ease-in-out transform will-change-transform
//                 hover:scale-[1.03]  hover:border-gray-700"
//               >
//                 <div>
//                   <h3 className="text-[22px] font-semibold mb-4">
//                     {cert.heading}
//                   </h3>

//                   <p className="text-[15px] opacity-95 leading-relaxed">
//                     {cert.content}
//                   </p>
//                 </div>

//                 <div className="absolute bottom-6 right-6">
//                   <img
//                     src={cert.icon}
//                     alt={cert.heading}
//                     className="w-14 h-14 object-contain filter brightness-0 invert"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="relative">
//             <div className="overflow-hidden py-6">
//               <div
//                 className="flex gap-8 transition-transform duration-500 ease-in-out"
//                 style={{
//                   transform: `translateX(-${
//                     currentIndex * (100 / itemsPerView)
//                   }%)`,
//                 }}
//               >
//                 {certifications.map((cert, index) => (
//                   <div
//                     key={index}
//                     className="w-[calc(100%/3-1.5rem)] flex-shrink-0 group"
//                   >
//                     <div
//                       className="relative bg-[#2D5C3A] text-white rounded-3xl p-8
//                       min-h-[300px]  flex flex-col justify-between
//                       border-2 border-transparent
//                       transition-all duration-300 ease-in-out transform
//                       will-change-transform
//                       hover:scale-[1.03]  hover:border-gray-700"
//                     >
//                       <div>
//                         <h3 className="text-[22px] font-semibold mb-4">
//                           {cert.heading}
//                         </h3>

//                         <p className="text-[15px] opacity-95 leading-relaxed">
//                           {cert.content}
//                         </p>
//                       </div>

//                       <div className="absolute bottom-6 right-6">
//                         <img
//                           src={cert.icon}
//                           alt={cert.heading}
//                           className="w-14 h-14 object-contain filter brightness-0 invert"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {certifications.length > itemsPerView && (
//               <div className="flex justify-center items-center gap-4 mt-8">
//                 <button
//                   onClick={prevSlide}
//                   disabled={currentIndex === 0}
//                   className="px-4 py-2 border rounded-full text-sm disabled:opacity-40 hover:bg-gray-100 transition"
//                 >
//                   Prev
//                 </button>

//                 <button
//                   onClick={nextSlide}
//                   disabled={
//                     currentIndex + itemsPerView >= certifications.length
//                   }
//                   className="px-4 py-2 border rounded-full text-sm disabled:opacity-40 hover:bg-gray-100 transition"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AboutCertification;

import React, { useState, useEffect } from 'react';
import { getCertifications } from '../../Api';

const AboutCertification = () => {
  const [certifications, setCertifications] = useState([]);
  const [visible, setVisible] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCertifications(token);
        setCertifications(data || []);
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    fetchCerts();

    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, [token]);

  return (
    <div className="w-full bg-white py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto font-figtree text-center">
        {/* HEADING */}
        <div
          className={`flex items-center gap-4 mb-10 mt-4 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex-1 h-[2px] bg-gray-300"></div>

          <h2 className="text-3xl sm:text-3xl lg:text-4xl whitespace-nowrap">
            <span className="font-normal">Core </span>
            <span className="font-semibold text-[#2D5C3A]">Values</span>
          </h2>

          <div className="flex-1 h-[2px] bg-gray-300"></div>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 cursor-pointer gap-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className={`text-left border-b pb-8 rounded-lg px-4 py-4 transition-all duration-700 ease-out -translate-y-1 shadow-md ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={cert.icon}
                  alt={cert.heading}
                  className="w-10 h-10 object-contain transition-transform duration-500 scale-110"
                />

                <h3 className="text-2xl font-semibold text-[#2D5C3A]">
                  {cert.heading}
                </h3>
              </div>

              <p className="text-black leading-relaxed">{cert.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutCertification;
