import React, { useEffect, useState } from 'react';
import { getAllCompletedProjects } from '../../Api';
import addEnq from '../../assets/Icons/addEnq2.png';

const CompletedMain = () => {
  const [scale, setScale] = useState(1.6);
  const [projectHeading, setProjectHeading] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectImage, setProjectImage] = useState('');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getAllCompletedProjects();

        if (res.success && res.data.length > 0) {
          const project = res.data[0];

          setProjectHeading(project.heading);
          setProjectDescription(project.description);
          setProjectImage(project.mainImage);
        }
      } catch (error) {
        console.error('Error fetching completed projects:', error);
      }
    };

    fetchProject();
  }, []);

  // Fade animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Scroll zoom effect
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
    const section = document.getElementById('get-in-touch');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      {projectImage && (
        <img
          src={projectImage}
          alt="Completed Project Banner"
          style={{
            transform: `scale(${scale})`,
            transition: 'transform 0.4s ease-out',
          }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-3xl text-center px-6 space-y-6
        transition-all duration-1000 ease-out
        ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        {/* Heading */}
        <h1 className="text-[28px] font-figtree md:text-[48px] font-light">
          {projectHeading.split(' ')[0]}{' '}
          <span className="font-semibold ">
            {projectHeading.split(' ').slice(1).join(' ')}
          </span>
        </h1>

        {/* Description */}
        <p className="text-base font-figtree md:text-xl lg:text-xl">
          {projectDescription || 'Loading project description...'}
        </p>

        {/* Enquiry Button */}
        <div className="flex justify-center pt-2">
          <img
            src={addEnq}
            alt="Ask Enquiry"
            onClick={handleScrollToContact}
            className="w-[120px] md:w-[150px] cursor-pointer transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default CompletedMain;
