// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import AboutCertification from '../AboutUs/AboutCertification';
// import BrandEthosSection from '../AboutUs/BrandEthosSection';
// // import BrandMotiveSection from '../AboutUs/BrandMotiveSection';
// import AwardRecognition from '../AboutUs/AwardRecgnition';

// const HomeBrandSections = () => {
//   const [currentSection, setCurrentSection] = useState(0);

//   const sections = [
//     <BrandEthosSection key="ethos" />,
//     <AboutCertification key="core" />,
//     // <BrandMotiveSection key="motive" />,
//     <AwardRecognition key="motive" />,
//   ];

//   const nextSection = () => {
//     if (currentSection < sections.length - 1) {
//       setCurrentSection((prev) => prev + 1);
//     }
//   };

//   const prevSection = () => {
//     if (currentSection > 0) {
//       setCurrentSection((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="relative w-full">
//       {currentSection > 0 && (
//         <button
//           onClick={prevSection}
//           className="absolute left-6 top-1/2 -translate-y-1/2
//                      backdrop-blur-md bg-[#2D5C3A]
//                      text-white p-3 rounded-full
//                      shadow-lg z-10
//                     transition"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>
//       )}

//       {currentSection < sections.length - 1 && (
//         <button
//           onClick={nextSection}
//           className="absolute right-6 top-1/2 -translate-y-1/2
//                      backdrop-blur-md bg-[#2D5C3A]
//                      text-white p-3 rounded-full
//                      shadow-lg z-10
//                      transition"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       )}

//       <div className="transition-all duration-500">
//         {sections[currentSection]}
//       </div>
//     </div>
//   );
// };

// export default HomeBrandSections;

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AboutCertification from '../AboutUs/AboutCertification';
import BrandEthosSection from '../AboutUs/BrandEthosSection';
// import BrandMotiveSection from '../AboutUs/BrandMotiveSection';
import AwardRecognition from '../AboutUs/AwardRecgnition';

const HomeBrandSections = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionRef = useRef(null);

  const sections = [
    <BrandEthosSection key="ethos" />,
    <AboutCertification key="core" />,
    // <BrandMotiveSection key="motive" />,
    <AwardRecognition key="award" />,
  ];

  const scrollToSectionTop = () => {
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 100);
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      scrollToSectionTop();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
      scrollToSectionTop();
    }
  };

  return (
    <div ref={sectionRef} className="w-full">
      {/* Section Content */}
      <div className="transition-all duration-500">
        {sections[currentSection]}
      </div>

      {/* Bottom Center Navigation */}
      {sections.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8 pb-4">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              currentSection === 0
                ? 'bg-[#2D5C3A] text-white opacity-40 cursor-not-allowed'
                : 'bg-[#2D5C3A] text-white'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <span className="font-medium text-gray-600">
            {currentSection + 1}
          </span>

          <button
            onClick={nextSection}
            disabled={currentSection === sections.length - 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              currentSection === sections.length - 1
                ? 'bg-[#2D5C3A] text-white opacity-40 cursor-not-allowed'
                : 'bg-[#2D5C3A] text-white'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeBrandSections;
