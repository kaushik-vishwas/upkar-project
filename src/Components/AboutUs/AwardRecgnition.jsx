import React, { useEffect, useState } from 'react';
import { getAwardRecognition } from '../../Api';

const AwardRecognitionSection = () => {
  const [awards, setAwards] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAwardRecognition();
        setAwards(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white py-8 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto font-figtree text-center">
        {/* HEADER */}
        <div
          className={`flex items-center gap-4 mb-16 mt-12 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex-1 h-[2px] bg-gray-300"></div>

          <h2 className="text-3xl sm:text-3xl lg:text-4xl whitespace-nowrap">
            <span className="font-normal">Awards </span>
            <span className="font-semibold text-[#2D5C3A]">& Recognition</span>
          </h2>

          <div className="flex-1 h-[2px] bg-gray-300"></div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">
          {awards.map((item, index) => (
            <div
              key={item._id}
              className={`text-left border-b cursor-pointer pb-8 rounded-lg px-2 transition-all duration-500 ease-out -translate-y-1 shadow-md ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-2 mb-2">
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 object-contain transition-transform duration-500 scale-110"
                  />
                )}

                <h3 className="text-2xl font-semibold text-[#2D5C3A]">
                  {item.title}
                </h3>
              </div>

              {/* SUBTITLE */}
              <p className="text-black font-medium leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AwardRecognitionSection;
