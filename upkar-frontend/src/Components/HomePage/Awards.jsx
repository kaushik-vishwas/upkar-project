import React, { useState, useEffect } from 'react';
import { getAwardsAPI } from '../../Api';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const data = await getAwardsAPI();
        setAwards(data);
        setTimeout(() => setAnimate(true), 200);
      } catch (error) {
        console.error('Error fetching awards:', error);
      }
    };

    fetchAwards();
  }, []);

  return (
    <section className="bg-[#2D5C3A] py-10 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-[Figtree] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
          {/* Title */}
          <div
            className={`lg:flex-shrink-0 text-center lg:text-left transition-all duration-1000 ease-out
            ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}
          >
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-figtree lg:text-[48px] font-semibold leading-tight">
              Awards
            </h2>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full lg:flex-1">
            {awards.length > 0 ? (
              awards.map((award, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center 
                  transition-all duration-700 ease-out
                  ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                  hover:scale-105`}
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain mb-3 sm:mb-4 transition-transform duration-500 ease-out hover:scale-110"
                  />

                  <div>
                    <p className="text-white text-base sm:text-lg md:text-xl lg:text-xl font-figtree font-normal leading-tight transition-all duration-500">
                      {award.title.split(' ')[0] || award.title}
                    </p>
                    <p className="text-white font-figtree text-base sm:text-lg md:text-xl lg:text-xl font-semibold leading-tight transition-all duration-500">
                      {award.title.split(' ').slice(1).join(' ') || ''}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-white col-span-4 text-center">
                No Awards found
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
