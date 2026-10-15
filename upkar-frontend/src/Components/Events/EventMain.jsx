import React, { useEffect, useState } from 'react';
import { getEventTop } from '../../Api';

const EventMain = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scale, setScale] = useState(1.4);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const res = await getEventTop();
        if (res.success) {
          setData(res.eventPage);
        }
      } catch (error) {
        console.error('Error fetching event page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      const progress = Math.min(scrollY / sectionHeight, 1);
      const newScale = 1.4 - progress * 0.4;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* HERO IMAGE WITH OVERLAY TEXT */}
      <div className="relative mb-14 overflow-hidden">
        <img
          src={data.mainImage}
          alt="Main Event"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.4s ease-out',
          }}
          className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text overlay */}
        <div
          className={`absolute inset-0 flex flex-col justify-center items-center text-center px-4 transition-all duration-1000
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h1 className="text-white text-[28px] md:text-[48px] font-figtree font-semibold mb-4">
            {data.mainTitle}
          </h1>

          <p className="text-white text-base font-figtree md:text-xl lg:text-xl max-w-3xl">
            {data.mainDescription}
          </p>
        </div>
      </div>

      {/* CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* SUB SECTION */}
        <div
          className={`flex flex-col lg:flex-row items-center gap-10 transition-all duration-1000 pb-12
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* TEXT */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-[24px] md:text-[32px] font-semibold font-figtree text-black mb-4">
              {data.subTitle}
            </h2>

            <p className="text-black text-base md:text-xl lg:text-xl font-figtree text-justify ">
              {data.subDescription}
            </p>
          </div>

          {/* IMAGE CARD */}
          <div className="flex-1">
            <div
              className="bg-white rounded-3xl overflow-hidden cursor-pointer 
              transition-all duration-300 
              hover:scale-[1.03] 
              border-2 border-gray-300 
              hover:border-[#2D5C3A]"
            >
              <img
                src={data.subImage}
                alt="Sub Event"
                className="w-full h-[250px] md:h-[350px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMain;
