// import React, { useState, useEffect } from 'react';
// import QuoteUp from '../../assets/Icons/VectorUp.png';
// import QuoteDown from '../../assets/Icons/VectorDown.png';
// import CertificationImage from '../../assets/Certification.png';
// import { getQuotesAPI } from '../../Api';

// const Quote = () => {
//   const [latestQuote, setLatestQuote] = useState(null);
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     fetchLatestQuote();
//   }, []);

//   useEffect(() => {
//     if (latestQuote) {
//       const timer = setTimeout(() => setAnimate(true), 200);
//       return () => clearTimeout(timer);
//     }
//   }, [latestQuote]);

//   const fetchLatestQuote = async () => {
//     try {
//       const data = await getQuotesAPI();
//       if (data && data.length > 0) {
//         setLatestQuote(data[data.length - 1]);
//       }
//     } catch (error) {
//       console.error('Error fetching quotes:', error);
//     }
//   };

//   if (!latestQuote) return null;

//   return (
//     <div className="px-4 lg:px-20 py-6 sm:py-8 md:py-10 lg:py-12">
//       <div
//         className="px-4 lg:px-10 py-8 sm:py-10 md:py-16 lg:py-24 relative rounded-[23px] overflow-hidden flex justify-center items-center transition-all duration-700 hover:scale-[1.01]"
//         style={{
//           backgroundImage: `url(${CertificationImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div
//           className={`relative w-full sm:w-[95%] md:w-[85%] lg:w-[85%]
//             bg-gradient-to-b from-white/50 via-white/30 to-white/0
//             backdrop-blur-lg border border-white/20
//             rounded-[23px]
//             px-4 sm:px-6 md:px-10 lg:px-14
//             py-8 sm:py-10 md:py-16 lg:py-20
//             shadow-lg
//             transition-all duration-700 ease-out
//             ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
//             hover:shadow-2xl hover:scale-[1.02]`}
//         >
//           <div className="relative max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto">
//             <div
//               className={`absolute -top-6 left-0 lg:-left-10 lg:-top-8 flex gap-1 opacity-90 transition-all duration-700 delay-200`}
//               style={{
//                 animation: 'floatUp 3s ease-in-out infinite',
//               }}
//             >
//               <img
//                 src={QuoteUp}
//                 alt="quote up"
//                 className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
//               />
//               <img
//                 src={QuoteUp}
//                 alt="quote up"
//                 className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
//               />
//             </div>

//             <p className="mt-6 text-white text-base sm:text-lg md:text-xl lg:text-xl xl:text-[22px] text-justify">
//               {latestQuote.text.split('').map((char, index) => (
//                 <span
//                   key={index}
//                   className={`inline-block transition-all duration-500 ease-out
//                     ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
//                   style={{
//                     transitionDelay: `${index * 30}ms`,
//                   }}
//                 >
//                   {char === ' ' ? '\u00A0' : char}
//                 </span>
//               ))}
//             </p>

//             <div className="flex justify-end mt-6">
//               <div
//                 className={`flex gap-1 opacity-90 transition-all duration-700 delay-500`}
//                 style={{
//                   animation: 'floatDown 3s ease-in-out infinite',
//                 }}
//               >
//                 <img
//                   src={QuoteDown}
//                   alt="quote down"
//                   className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
//                 />
//                 <img
//                   src={QuoteDown}
//                   alt="quote down"
//                   className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes floatUp {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(-6px); }
//             100% { transform: translateY(0px); }
//           }

//           @keyframes floatDown {
//             0% { transform: translateY(0px); }
//             50% { transform: translateY(6px); }
//             100% { transform: translateY(0px); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Quote;

import React, { useState, useEffect } from 'react';
import QuoteUp from '../../assets/Icons/VectorUp.png';
import QuoteDown from '../../assets/Icons/VectorDown.png';
import CertificationImage from '../../assets/Certification.png';
import { getQuotesAPI } from '../../Api';

const Quote = () => {
  const [latestQuote, setLatestQuote] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    fetchLatestQuote();
  }, []);

  useEffect(() => {
    if (latestQuote) {
      const timer = setTimeout(() => setAnimate(true), 200);
      return () => clearTimeout(timer);
    }
  }, [latestQuote]);

  const fetchLatestQuote = async () => {
    try {
      const data = await getQuotesAPI();
      if (data && data.length > 0) {
        setLatestQuote(data[data.length - 1]);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  if (!latestQuote) return null;

  return (
    <div className="w-full py-6 sm:py-8 md:py-10 lg:py-12">
      {/* SAME CONTAINER WIDTH AS MAP */}
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-10">
        <div
          className="px-4 lg:px-10 py-8 sm:py-10 md:py-16 lg:py-24 relative rounded-[23px] overflow-hidden flex justify-center items-center transition-all duration-700 hover:scale-[1.01]"
          style={{
            backgroundImage: `url(${CertificationImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className={`relative w-full sm:w-[95%] md:w-[85%] lg:w-[85%] 
            bg-gradient-to-b from-white/50 via-white/30 to-white/0  
            backdrop-blur-lg border border-white/20  
            rounded-[23px]  
            px-4 sm:px-6 md:px-10 lg:px-14  
            py-8 sm:py-10 md:py-16 lg:py-20  
            shadow-lg
            transition-all duration-700 ease-out
            ${animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
            hover:shadow-2xl hover:scale-[1.02]`}
          >
            <div className="relative max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto">
              {/* TOP QUOTE */}
              <div
                className="absolute -top-6 left-0 lg:-left-10 lg:-top-8 flex gap-1 opacity-90 transition-all duration-700 delay-200"
                style={{ animation: 'floatUp 3s ease-in-out infinite' }}
              >
                <img
                  src={QuoteUp}
                  alt="quote up"
                  className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
                />
                <img
                  src={QuoteUp}
                  alt="quote up"
                  className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
                />
              </div>

              {/* QUOTE TEXT */}
              <p className="mt-6 text-white text-base sm:text-lg md:text-xl lg:text-xl xl:text-[22px] text-justify">
                {latestQuote.text.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-500 ease-out
                    ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{
                      transitionDelay: `${index * 30}ms`,
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </p>

              {/* BOTTOM QUOTE */}
              <div className="flex justify-end mt-6">
                <div
                  className="flex gap-1 opacity-90 transition-all duration-700 delay-500"
                  style={{ animation: 'floatDown 3s ease-in-out infinite' }}
                >
                  <img
                    src={QuoteDown}
                    alt="quote down"
                    className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
                  />
                  <img
                    src={QuoteDown}
                    alt="quote down"
                    className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }

          @keyframes floatDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(6px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Quote;
