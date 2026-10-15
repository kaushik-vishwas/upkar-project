import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProjectImagesAPI } from '../../Api';

const PrjctGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getProjectImagesAPI(token);

        const allImages = data.flatMap((item) => item.images || []);
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching project images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [token]);

  if (loading) return <p className="text-center py-20">Loading gallery...</p>;
  if (!images.length)
    return <p className="text-center py-20">No images found</p>;

  return (
    <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
      <h2 className="mb-12 text-[48px] font-[Figtree] text-black leading-tight">
        <span className="font-semibold">Project</span>{' '}
        <span className="font-light">Images</span>
      </h2>

      <div className="relative hidden sm:block">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-6 gallery-container">
          {Array.from({ length: Math.ceil(images.length / 8) }).map((_, i) => {
            const chunk = images.slice(i * 8, i * 8 + 8);
            const [img0, img1, img2, img3, img4, img5, img6, img7] = chunk;

            return (
              <div key={i} className="flex-shrink-0 w-full snap-center">
                <div className="grid grid-cols-[2fr_1fr_2fr] gap-4">
                  {img0 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={img0}
                        alt={`slide-${i}-0`}
                        className="w-full h-[340px] object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {img1 && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={img1}
                          alt={`slide-${i}-1`}
                          className="w-full h-[160px] object-cover"
                        />
                      </div>
                    )}
                    {img2 && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={img2}
                          alt={`slide-${i}-2`}
                          className="w-full h-[160px] object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {img3 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={img3}
                        alt={`slide-${i}-3`}
                        className="w-full h-[340px] object-cover"
                      />
                    </div>
                  )}

                  {img4 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={img4}
                        alt={`slide-${i}-4`}
                        className="w-full h-[340px] object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    {img5 && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={img5}
                          alt={`slide-${i}-5`}
                          className="w-full h-[160px] object-cover"
                        />
                      </div>
                    )}
                    {img6 && (
                      <div className="rounded-lg overflow-hidden">
                        <img
                          src={img6}
                          alt={`slide-${i}-6`}
                          className="w-full h-[160px] object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {img7 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={img7}
                        alt={`slide-${i}-7`}
                        className="w-full h-[340px] object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="absolute left-0 top-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={() =>
            document
              .querySelector('.gallery-container')
              ?.scrollBy({ left: -400, behavior: 'smooth' })
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute right-0 top-1/2 bg-[#000000] text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={() =>
            document
              .querySelector('.gallery-container')
              ?.scrollBy({ left: 400, behavior: 'smooth' })
          }
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="relative block sm:hidden mt-2 mx-2">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-6 mobile-gallery">
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-[400px] rounded-lg overflow-hidden snap-center"
            >
              <img
                src={src}
                alt={`gallery-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <button
          className="absolute left-0 top-1/2 bg-white text-gray-800 p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={() =>
            document
              .querySelector('.mobile-gallery')
              ?.scrollBy({ left: -400, behavior: 'smooth' })
          }
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          className="absolute right-0 top-1/2 bg-[#000000] text-white p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={() =>
            document
              .querySelector('.mobile-gallery')
              ?.scrollBy({ left: 400, behavior: 'smooth' })
          }
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PrjctGallery;
