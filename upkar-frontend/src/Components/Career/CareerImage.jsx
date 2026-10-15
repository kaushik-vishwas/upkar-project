import React, { useEffect, useState } from 'react';
import Career from '../../assets/career.jpg';
import JoinUs from '../../assets/Icons/joinUs.png';
import { getCareerMainAPI } from '../../Api';

const CareerHero = () => {
  const [scale, setScale] = useState(1.6);
  const [careerDescription, setCareerDescription] = useState('');
  const [showContent, setShowContent] = useState(false);

  const fullHeading = 'Careers at Upkar Groups';

  useEffect(() => {
    const fetchCareerDescription = async () => {
      try {
        const res = await getCareerMainAPI();
        if (res.success && res.data.length > 0) {
          setCareerDescription(res.data[0].careerDescription);
        }
      } catch (error) {
        console.error('Failed to fetch career description:', error);
      }
    };

    fetchCareerDescription();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionHeight = window.innerHeight;
      const progress = Math.min(scrollY / sectionHeight, 1);

      const newScale = 1.4 - progress * 0.4;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToContact = () => {
    const section = document.getElementById('job-openings');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={Career}
        alt="Career Banner"
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.4s ease-out',
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-3xl text-center px-6 space-y-6
        transition-all duration-1000 ease-out
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
          {fullHeading.split('Upkar')[0]}
          <span className="font-semibold">
            Upkar{fullHeading.split('Upkar')[1]}
          </span>
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
          {careerDescription || 'Loading career description...'}
        </p>

        {/* Join Us Button */}
        <div className="flex justify-center pt-2">
          <img
            src={JoinUs}
            alt="Join Us"
            onClick={handleScrollToContact}
            className="w-[120px] md:w-[150px] cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
