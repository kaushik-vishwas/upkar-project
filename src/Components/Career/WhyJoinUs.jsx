// import React, { useEffect, useState, useRef } from 'react';
// import { getWhyJoinAPI } from '../../Api';
// import { toast } from 'react-toastify';

// const WhyJoinUs = () => {
//   const [reasons, setReasons] = useState([]);
//   const [visibleReasons, setVisibleReasons] = useState({});
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const fetchReasons = async () => {
//       try {
//         const res = await getWhyJoinAPI();
//         if (res.success) setReasons(res.data);
//       } catch (error) {
//         console.error('Failed to fetch Why Join Us data:', error);
//         toast.error('Failed to fetch Why Join Us data');
//       }
//     };
//     fetchReasons();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.dataset.id;
//             setVisibleReasons((prev) => ({ ...prev, [id]: true }));
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.3 },
//     );

//     Object.values(
//       sectionRef.current?.querySelectorAll('[data-id]') || [],
//     ).forEach((el) => {
//       observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [reasons]);

//   return (
//     <div ref={sectionRef} className="w-full bg-white py-16 px-4">
//       <div className="max-w-6xl mx-auto space-y-16">
//         <div className="flex items-center justify-center mb-12">
//           {/* LEFT LINE */}
//           <div className="flex-1 h-[1px] bg-gray-300 mr-3 sm:mr-6"></div>

//           {/* TITLE */}
//           <h2 className="text-3xl sm:text-3xl md:text-4xl font-figtree text-center whitespace-nowrap">
//             <span className="font-normal">Why</span>{' '}
//             <span className="font-semibold text-[#2D5C3A]">Join us?</span>
//           </h2>

//           {/* RIGHT LINE */}
//           <div className="flex-1 h-[1px] bg-gray-300 ml-3 sm:ml-6"></div>
//         </div>
//         <div className="text-center">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {reasons.length > 0 ? (
//               reasons.map((reason) => (
//                 <div
//                   key={reason._id}
//                   data-id={reason._id}
//                   className={`space-y-3 text-left sm:text-center transition-all duration-1000 ease-out
//                     ${visibleReasons[reason._id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//                 >
//                   {/* Title */}
//                   <h3 className="font-figtree font-semibold text-base sm:text-lg md:text-xl lg:text-xl text-black">
//                     {reason.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="font-figtree  text-base sm:text-base md:text-lg lg:text-lg text-black  text-justify sm:text-center">
//                     {reason.description}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 col-span-full">No data found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyJoinUs;

import React, { useEffect, useState, useRef } from 'react';
import { getWhyJoinAPI } from '../../Api';
import { toast } from 'react-toastify';

const WhyJoinUs = () => {
  const [reasons, setReasons] = useState([]);
  const [visibleReasons, setVisibleReasons] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const res = await getWhyJoinAPI();
        if (res.success) setReasons(res.data);
      } catch (error) {
        console.error('Failed to fetch Why Join Us data:', error);
        toast.error('Failed to fetch Why Join Us data');
      }
    };
    fetchReasons();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleReasons((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    Object.values(
      sectionRef.current?.querySelectorAll('[data-id]') || [],
    ).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reasons]);

  return (
    <div ref={sectionRef} className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* HEADER */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-[1px] bg-gray-300 mr-3 sm:mr-6"></div>

          <h2 className="text-3xl sm:text-3xl md:text-4xl font-figtree text-center whitespace-nowrap">
            <span className="font-normal">Why</span>{' '}
            <span className="font-semibold text-[#2D5C3A]">Join us?</span>
          </h2>

          <div className="flex-1 h-[1px] bg-gray-300 ml-3 sm:ml-6"></div>
        </div>

        {/* GRID */}
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.length > 0 ? (
              reasons.map((reason, index) => (
                <div
                  key={reason._id}
                  data-id={reason._id}
                  className={`bg-white text-left sm:text-center border-b pb-8 rounded-lg px-4 py-6 shadow-md transition-all duration-700 ease-out -translate-y-1
                    ${
                      visibleReasons[reason._id]
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                    }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* TITLE */}
                  <h3 className="font-figtree font-semibold text-base sm:text-lg md:text-xl lg:text-xl text-[#2D5C3A] mb-3">
                    {reason.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="font-figtree text-base sm:text-base md:text-lg lg:text-lg text-black text-justify sm:text-center leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No data found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyJoinUs;
