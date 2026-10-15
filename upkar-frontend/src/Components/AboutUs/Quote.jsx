import React, { useEffect, useState } from 'react';
import QuoteUp from '../../assets/Icons/VectorUp.png';
import QuoteDown from '../../assets/Icons/VectorDown.png';
import { getAllQuotes } from '../../Api';

const Quote = () => {
  const [quote, setQuote] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await getAllQuotes();
        if (res?.quotes?.length > 0) {
          setQuote(res.quotes[0]);
          setTimeout(() => setAnimate(true), 150);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  if (!quote)
    return (
      <div className="text-center py-10 bg-black text-white">Loading...</div>
    );

  return (
    <>
      <div className="flex items-center gap-4 mb-6 mt-5 px-4 sm:px-8 md:px-14">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-figtree text-center whitespace-nowrap">
          <span className="font-normal">Chairman's </span>
          <span className="font-semibold text-[#2D5C3A]">Note</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>
      <div
        className="bg-[#2D5C3A] text-white py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-8 md:px-14 font-figtree"
        style={{
          transition: 'background 0.6s ease',
        }}
      >
        <div
          className="relative max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%] mx-auto"
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'translateY(0px)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {/* Top Quotes */}
          <div
            className="absolute -top-6 left-0 lg:-left-10 lg:-top-8 flex gap-1 opacity-80"
            style={{
              animation: 'floatUp 3s ease-in-out infinite',
            }}
          >
            <img
              src={QuoteUp}
              alt="quote up"
              className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
              style={{
                transition: 'transform 0.4s ease',
              }}
            />
            <img
              src={QuoteUp}
              alt="quote up"
              className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
            />
          </div>

          {/* Quote Text */}
          <p
            className="mt-6 text-base sm:text-base md:text-xl lg:text-xl xl:text-xl font-normal  text-justify"
            style={{
              opacity: animate ? 1 : 0,
              transition: 'opacity 1.2s ease 0.3s',
            }}
          >
            {quote.quoteContent}
          </p>

          {/* Bottom Quotes */}
          <div className="flex justify-end mt-6">
            <div
              className="flex gap-1 opacity-80"
              style={{
                animation: 'floatDown 3s ease-in-out infinite',
              }}
            >
              <img
                src={QuoteDown}
                alt="quote down"
                className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
              />
              <img
                src={QuoteDown}
                alt="quote down"
                className="w-3 h-3 sm:w-4 sm:h-5 md:w-5 md:h-6 lg:w-6 lg:h-7"
              />
            </div>
          </div>

          {/* Author */}
          <div
            className="mt-8 text-right"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s ease 0.6s',
            }}
          >
            <h3 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl">
              {quote.name}
            </h3>

            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-light">
              {quote.position}
            </p>
          </div>
        </div>

        {/* Inline Keyframes */}
        <style>
          {`
          @keyframes floatUp {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }

          @keyframes floatDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(6px); }
            100% { transform: translateY(0px); }
          }
        `}
        </style>
      </div>
    </>
  );
};

export default Quote;
