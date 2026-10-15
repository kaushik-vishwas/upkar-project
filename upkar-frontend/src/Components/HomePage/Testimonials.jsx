import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonialsAPI } from '../../Api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(2);
      } else if (window.innerWidth >= 640) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(1);
      }
    };

    updateCardsPerPage();

    window.addEventListener('resize', updateCardsPerPage);

    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [cardsPerPage]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonialsAPI();

        setTestimonials(response.data || []);

        setTimeout(() => {
          setAnimate(true);
        }, 200);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const nextSlide = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    // <section className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <section className="bg-white pt-4 pb-12 sm:pt-4 sm:pb-16 lg:pt-6 lg:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div
          className={`text-center mb-10 transition-all duration-1000 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {/* <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-figtree text-[#2D5C3A]">
            Testimonials
          </h2> */}
          <div className="flex items-center gap-4 mb-8 lg:mb-12">
            <div className="flex-1 h-[2px] bg-gray-300"></div>

            <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-figtree text-center whitespace-nowrap">
              <span className="font-semibold text-[#2D5C3A]">Testimonials</span>
            </h2>

            <div className="flex-1 h-[2px] bg-gray-300"></div>
          </div>
        </div>

        {testimonials.length > 0 ? (
          <>
            {/* Slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentPage * 100}%)`,
                }}
              >
                {Array.from({ length: totalPages }, (_, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="min-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
                  >
                    {testimonials
                      .slice(
                        pageIndex * cardsPerPage,
                        pageIndex * cardsPerPage + cardsPerPage,
                      )
                      .map((item, index) => (
                        <div
                          key={item._id}
                          className={`bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-[220px] flex flex-col transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                            animate
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-10'
                          }`}
                          style={{
                            transitionDelay: `${index * 120}ms`,
                          }}
                        >
                          {/* User */}
                          <div className="flex items-center gap-3 mb-4">
                            {/* <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-base"
                              style={{
                                backgroundColor: '#2D5C3A',
                              }}
                            >
                              {item.customerName?.charAt(0).toUpperCase()}
                            </div> */}
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-medium text-sm"
                              style={{
                                backgroundColor: '#2D5C3A',
                              }}
                            >
                              {item.customerName
                                ?.split(' ')
                                .map((word) => word.charAt(0).toUpperCase())
                                .slice(0, 2)
                                .join('')}
                            </div>

                            <h3 className="text-base font-semibold font-figtree text-black">
                              {item.customerName}
                            </h3>
                          </div>

                          {/* Description */}
                          <div
                            className="mt-3 h-[120px] overflow-y-auto scrollbar-hide"
                            onWheel={(e) => e.stopPropagation()}
                          >
                            <p className="text-gray-600 font-figtree text-[15px] leading-7 ">
                              "{item.description}"
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Buttons */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  onClick={prevSlide}
                  disabled={currentPage === 0}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    currentPage === 0
                      ? 'bg-[#2D5C3A] text-white disabled:opacity-40  cursor-not-allowed'
                      : 'bg-[#2D5C3A] text-white disabled:opacity-40  '
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="font-medium text-gray-600">
                  {currentPage + 1}
                </span>

                <button
                  onClick={nextSlide}
                  disabled={currentPage === totalPages - 1}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    currentPage === totalPages - 1
                      ? '  bg-[#2D5C3A] text-white disabled:opacity-40  cursor-not-allowed'
                      : ' bg-[#2D5C3A] text-white disabled:opacity-40'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500 py-10">
            No Testimonials Found
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
