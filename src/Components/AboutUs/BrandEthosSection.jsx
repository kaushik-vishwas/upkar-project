import React, { useEffect, useState } from 'react';
import { getBrandEthos } from '../../Api';

const BrandEthosSection = () => {
  const [ethos, setEthos] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBrandEthos();
        setEthos(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    setTimeout(() => {
      setVisible(true);
    }, 100);
  }, []);

  return (
    <div className="w-full bg-white py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto font-figtree text-center">
        {/* HEADER */}
        <div
          className={`flex items-center gap-4 mb-6 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex-1 h-[2px] bg-gray-300"></div>

          <h2 className="text-3xl sm:text-3xl lg:text-4xl whitespace-nowrap">
            <span className="font-normal">Brand </span>
            <span className="font-semibold text-[#2D5C3A]">Ethos</span>
          </h2>

          <div className="flex-1 h-[2px] bg-gray-300"></div>
        </div>

        {/* DESCRIPTION */}
        <p
          className={`text-center font-medium text-lg sm:text-xl md:text-xl mb-10 transition-all duration-500 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Our brand ethos is anchored in key pillars that define our identity.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 cursor-pointer gap-10">
          {ethos.map((item, index) => (
            <div
              key={item._id}
              className={`text-left border-b pb-8 rounded-lg px-2 transition-all duration-500 ease-out -translate-y-1 shadow-md ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* ICON + TITLE */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-10 h-10 object-contain transition-transform duration-500 scale-110"
                />

                <h3 className="text-2xl font-semibold text-[#2D5C3A]">
                  {item.title}
                </h3>
              </div>

              {/* DESCRIPTION */}
              <p className="text-black leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandEthosSection;
