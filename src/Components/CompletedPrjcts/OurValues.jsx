import React, { useEffect, useState, useRef } from 'react';
import { getAllOurValues } from '../../Api';

const OurValues = () => {
  const [values, setValues] = useState([]);
  const [animatedTitles, setAnimatedTitles] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);

  // Fetch Values
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const res = await getAllOurValues();
        setValues(res.data);
      } catch (error) {
        console.error('Failed to fetch values:', error);
      }
    };

    fetchValues();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  //  Animate ONLY when visible
  useEffect(() => {
    if (!isVisible || !values.length) return;

    values.forEach((value) => {
      let index = 0;
      const duration = 2000;
      const intervalTime =
        value.title.length > 0 ? duration / value.title.length : 100;

      setAnimatedTitles((prev) => ({
        ...prev,
        [value._id]: '',
      }));

      const interval = setInterval(() => {
        index++;
        setAnimatedTitles((prev) => ({
          ...prev,
          [value._id]: value.title.slice(0, index),
        }));

        if (index >= value.title.length) {
          clearInterval(interval);
        }
      }, intervalTime);
    });
  }, [isVisible, values]);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white pt-0 pb-6 px-4 font-figtree"
    >
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-4xl md:text-5xl mb-16 text-black">
          <span className="font-normal">Our </span>
          <span className="font-semibold text-[#2D5C3A]">Values</span>
        </h2> */}
        <div className="flex items-center gap-4 mb-6 md:mb-6 lg:mb-6">
          <div className="flex-1 h-[2px] bg-gray-300"></div>
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-figtree text-center whitespace-nowrap">
            <span className="font-normal">Our</span>{' '}
            <span className="font-semibold text-[#2D5C3A]">Values</span>
          </h2>
          <div className="flex-1 h-[2px] bg-gray-300"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-4">
          {values.map((value) => (
            <div
              key={value._id}
              className="flex flex-col items-center justify-center space-y-4 group cursor-pointer"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={value.iconImage}
                  alt={value.title}
                  className="max-w-[64px] max-h-[64px] object-contain"
                />
              </div>

              {/* Animated Title */}
              <p className="font-figtree font-medium text-lg text-black text-center min-h-[28px]">
                {animatedTitles[value._id] || ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurValues;
