import React from 'react';

const Amenities = ({ project }) => {
  if (!project?.amenities?.length) return null;

  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[48px] font-[Figtree] font-semibold text-black mb-12">
          Amenities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.amenities.map((amenity, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300 group cursor-pointer bg-white"
            >
              <div className="flex items-center gap-4">
                <p className="text-[18px] font-medium text-gray-800 group-hover:text-black transition-colors duration-300">
                  {amenity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
