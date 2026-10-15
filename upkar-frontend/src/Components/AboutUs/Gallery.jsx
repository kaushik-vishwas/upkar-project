import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getAboutImages } from '../../Api';

const AboutImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);

  const token = localStorage.getItem('adminToken');

  const galleryRef = useRef(null);
  const mobileGalleryRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getAboutImages(token);
        const allImages = data.flatMap((item) => item.images || []);
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching about images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [token]);

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalData]);

  const openModal = (index) => {
    setModalData({ index });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const changeModalImage = (direction) => {
    setModalData((prev) => {
      const newIndex =
        direction === 'next'
          ? (prev.index + 1) % images.length
          : (prev.index - 1 + images.length) % images.length;

      return { index: newIndex };
    });
  };

  const scrollLeft = (ref) => {
    ref.current?.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = (ref) => {
    ref.current?.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth',
    });
  };

  if (loading) return <p className="text-center py-20">Loading gallery...</p>;
  if (!images.length)
    return <p className="text-center py-20">No images found</p>;

  return (
    <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
      <h2 className="text-[48px] font-[Figtree] font-semibold text-[#2D5C3A] leading-tight mb-12">
        Gallery
      </h2>

      <div className="relative hidden sm:block">
        <div
          ref={galleryRef}
          className="flex overflow-hidden snap-x snap-mandatory scroll-smooth pb-6"
        >
          {Array.from({ length: Math.ceil(images.length / 3) }).map((_, i) => {
            const chunk = images.slice(i * 3, i * 3 + 3);

            return (
              <div key={i} className="flex-shrink-0 w-full snap-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {chunk.map((img, index) => {
                    const globalIndex = i * 3 + index;
                    return (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden h-[300px] cursor-pointer"
                        onClick={() => openModal(globalIndex)}
                      >
                        <img
                          src={img}
                          alt={`slide-${i}-${index}`}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition"
          onClick={() => scrollLeft(galleryRef)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 rounded-full shadow-md hover:scale-110 transition"
          onClick={() => scrollRight(galleryRef)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="relative block sm:hidden mt-2 mx-2">
        <div
          ref={mobileGalleryRef}
          className="flex overflow-hidden snap-x snap-mandatory scroll-smooth pb-6"
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-[400px] rounded-lg overflow-hidden snap-center cursor-pointer"
              onClick={() => openModal(index)}
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
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md"
          onClick={() => scrollLeft(mobileGalleryRef)}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 rounded-full shadow-md"
          onClick={() => scrollRight(mobileGalleryRef)}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {modalData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={images[modalData.index]}
              alt="Preview"
              className="max-h-[80vh] w-auto max-w-[90vw] object-contain rounded-lg"
            />

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={() => changeModalImage('prev')}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => changeModalImage('next')}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutImages;
