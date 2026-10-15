import React, { useEffect, useState } from 'react';
import tree from '../../assets/Tree.png';
import UbkarHabit from '../../assets/UbkarHabit.png';
import { getTreeSections } from '../../Api';

export default function Section() {
  const [section, setSection] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchSection = async () => {
      try {
        const data = await getTreeSections();
        if (data && data.length > 0) {
          setSection(data[0]);
        }
      } catch (error) {
        console.error('Error fetching tree sections:', error);
      }
    };

    fetchSection();

    setTimeout(() => setAnimate(true), 150);
  }, []);

  if (!section) return null;

  const splitHeading2 = () => {
    if (!section.heading2) return ['', ''];
    const words = section.heading2.trim().split(' ');
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  };

  const [heading2First, heading2Second] = splitHeading2();

  return (
    <div
      className="flex flex-col gap-6 px-4 sm:px-0 md:gap-6 lg:gap-6"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0px)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Heading Section */}
      <div className="text-center flex flex-col gap-4 sm:gap-4 md:gap-6 lg:gap-8 mt-4 items-center">
        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-figtree lg:text-[64px] font-medium"
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.2s ease',
          }}
        >
          {section.heading1}
        </h2>

        <h2
          className="text-2xl sm:text-4xl md:text-5xl font-figtree lg:text-[64px] text-[#2D5C3A] font-semibold"
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1.4s ease',
          }}
        >
          {heading2First}{' '}
          <span
            className="inline-flex items-center justify-center align-middle"
            style={{
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            <img
              src={tree}
              alt="Tree Icon"
              className="w-20 sm:w-28 lg:w-32 h-auto object-contain"
            />
          </span>{' '}
          {heading2Second}
        </h2>
      </div>

      {/* Description + Image Section */}
      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1.6s ease',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
          {/* Description */}
          <div className="w-full lg:w-1/2">
            <p className="text-base sm:text-lg md:text-xl lg:text-xl text-[#000000] font-medium font-figtree leading-relaxed text-justify">
              {section.description}
            </p>
          </div>

          {/* Image */}
          <div
            className="w-full lg:w-1/2 h-[250px] sm:h-[300px] lg:h-[250px] rounded-2xl overflow-hidden shadow-xl"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 1.8s ease',
            }}
          >
            <img
              src={section.image || UbkarHabit}
              alt="Upkar Habitat"
              className="w-full h-full object-cover"
              style={{
                transition: 'transform 0.8s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.05)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            />
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}
      </style>
    </div>
  );
}
