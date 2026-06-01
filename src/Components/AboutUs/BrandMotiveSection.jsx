import React, { useEffect, useState } from 'react';
import { getBrandMotive } from '../../Api';

const BrandMotiveSection = () => {
  const [motive, setMotive] = useState([]);
  const [displayText, setDisplayText] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBrandMotive();
        setMotive(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    motive.forEach((item) => {
      const fullText = item.highlightText;
      let index = 0;

      const totalDuration = 3000; // 3 seconds
      const intervalTime = totalDuration / fullText.length;

      const interval = setInterval(() => {
        index++;

        setDisplayText((prev) => ({
          ...prev,
          [item._id]: fullText.slice(0, index),
        }));

        if (index === fullText.length) {
          clearInterval(interval);
        }
      }, intervalTime);
    });
  }, [motive]);

  return (
    <div className="w-full bg-gray-50 py-20 px-6 lg:px-20 text-center">
      <h2 className="text-4xl font-figtree sm:text-4xl md:text-4xl lg:text-4xl ">
        Brand <span className="font-semibold text-[#2D5C3A]">Motive</span>
      </h2>

      {motive.map((item) => (
        <div key={item._id} className="mt-10">
          <h1 className="text-5xl md:text-6xl font-bold text-black italic">
            {displayText[item._id] || ''}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default BrandMotiveSection;
