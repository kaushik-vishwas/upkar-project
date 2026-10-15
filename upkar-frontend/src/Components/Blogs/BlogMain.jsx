import React, { useEffect, useState } from 'react';
import { getAllBlogMain } from '../../Api';

const BlogMainSection = () => {
  const [blogData, setBlogData] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await getAllBlogMain();

        if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
          setBlogData(res.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleScrollToContact = () => {
    const section = document.getElementById('job-openings');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!blogData) return null;

  return (
    <div className="w-full bg-white py-8 md:py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
        <div
          className={`text-center space-y-6 md:space-y-8
          transition-all duration-1000 ease-out
          ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* HEADING */}
          <h2 className="text-3xl sm:text-4xl font-figtree md:text-4xl lg:text-[48px] font-light leading-tight text-black mb-8 sm:mb-12 md:mb-16 lg:mb-[60px] text-center">
            {blogData.heading?.split(' ')[0]}{' '}
            <span className="font-semibold">
              {blogData.heading?.split(' ').slice(1).join(' ')}
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="font-figtree font-light 
            text-sm sm:text-base md:text-lg lg:text-[20px] 
            text-black 
            leading-relaxed 
            max-w-full sm:max-w-[90%] md:max-w-4xl 
            mx-auto 
            px-2 sm:px-0 
            text-justify sm:text-center 
            whitespace-pre-line"
          >
            {blogData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogMainSection;
