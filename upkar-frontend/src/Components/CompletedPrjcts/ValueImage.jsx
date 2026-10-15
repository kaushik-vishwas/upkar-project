import React, { useEffect, useState } from 'react';
import { getValueImages } from '../../Api';

const ValueImage = () => {
  const [latestImage, setLatestImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    loadImage();
  }, []);

  const loadImage = async () => {
    try {
      const data = await getValueImages();

      if (Array.isArray(data) && data.length > 0) {
        setLatestImage(data[0].image);

        setTimeout(() => {
          setShowImage(true);
        }, 100);
      }
    } catch (error) {
      console.error('Error fetching value image:', error);
    }
  };

  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div
          className={`group bg-white rounded-3xl overflow-hidden shadow-md 
            cursor-pointer 
            border-2
            transition-all duration-1000 ease-in-out
            hover:shadow-2xl hover:scale-[1.03] hover:border-[#2D5C3A]
            ${showImage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {latestImage ? (
            <img
              src={latestImage}
              alt="Value Image"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200">
              Loading image...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValueImage;
