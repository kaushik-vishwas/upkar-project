import React from 'react';
import DirectionsImage from '../../assets/Directions.png';

const Directions = ({ project }) => {
  if (!project?.locationUrl) return null;

  const getFullUrl = (url) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <div className="w-full bg-white py-16 px-4 font-figtree">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-16 text-[48px] font-[Figtree] font-semibold text-black">
          Directions
        </h2>

        <div className="relative w-full max-w-6xl mx-auto">
          <a
            href={getFullUrl(project.locationUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={DirectionsImage}
              alt="Get Directions"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Directions;
