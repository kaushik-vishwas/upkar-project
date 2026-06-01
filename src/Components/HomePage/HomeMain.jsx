import React, { useState, useEffect, useRef } from 'react';
import { getBanners } from '../../Api';
import { useNavigate } from 'react-router-dom';
import AboveIcon from '../../assets/aboveIcon.png';
import { ArrowRight } from 'lucide-react';

const HomeMain = () => {
  const [banner, setBanner] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');
  const [animatedTitle1, setAnimatedTitle1] = useState('');
  const [animatedTitle2, setAnimatedTitle2] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [animatedSubtitle, setAnimatedSubtitle] = useState('');
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();
  const slidingRef = useRef(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await getBanners(token);
        if (data && data.length > 0) setBanner(data[0]);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanner();
  }, [token]);

  useEffect(() => {
    if (!banner?.images || banner.images.length <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [banner, currentImageIndex]);

  const goToNext = () => {
    if (slidingRef.current || !banner?.images) return;
    const nextIndex =
      currentImageIndex === banner.images.length - 1
        ? 0
        : currentImageIndex + 1;
    triggerSlide(nextIndex, 'left');
  };

  const triggerSlide = (nextIndex, direction) => {
    slidingRef.current = true;
    setSlideDirection(direction);
    setPrevImageIndex(currentImageIndex);
    setCurrentImageIndex(nextIndex);
    setIsSliding(true);

    setTimeout(() => {
      setPrevImageIndex(null);
      setIsSliding(false);
      slidingRef.current = false;
    }, 600);
  };

  useEffect(() => {
    if (!banner?.title) return;

    const titleLines = banner.title.split('\n');
    const line1 = titleLines[0] || '';
    const line2 = titleLines[1] || '';
    const subtitle = banner.subtitle || '';

    animateText(line1, setAnimatedTitle1, 1000, () => {
      animateText(line2, setAnimatedTitle2, 1000, () => {
        setAnimatedSubtitle(subtitle);
        setShowSubtitle(true);
      });
    });
  }, [banner]);

  const animateText = (text, setter, duration, callback) => {
    let index = 0;
    setter('');
    const intervalTime = duration / (text.length || 1);

    const interval = setInterval(() => {
      index++;
      setter(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, intervalTime);
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="relative w-full aspect-[16/8] lg:aspect-[21/8] overflow-hidden">
          {banner?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`banner-${index}`}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform:
                  index === currentImageIndex
                    ? 'translateX(0%)'
                    : index === prevImageIndex
                      ? slideDirection === 'left'
                        ? 'translateX(-100%)'
                        : 'translateX(100%)'
                      : slideDirection === 'left'
                        ? 'translateX(100%)'
                        : 'translateX(-100%)',
                transition:
                  index === currentImageIndex || index === prevImageIndex
                    ? 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
                    : 'none',
                zIndex:
                  index === currentImageIndex
                    ? 2
                    : index === prevImageIndex
                      ? 1
                      : 0,
              }}
            />
          ))}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
            style={{ zIndex: 3 }}
          />

          {/* Text content */}
          <div
            className="absolute inset-0 flex flex-col justify-end sm:justify-start px-4 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-0 sm:pt-24 md:pt-32 lg:pt-40"
            style={{ zIndex: 4 }}
          >
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[64px] mb-4 sm:mb-6 font-figtree">
              <span className="font-semibold">{animatedTitle1}</span>
              <br />
              <span className="font-bold">{animatedTitle2}</span>
            </h1>

            <p
              className={`block text-white max-w-[90%] sm:max-w-lg md:max-w-xl text-base sm:text-lg md:text-2xl lg:text-2xl mb-4 sm:mb-6
      font-figtree font-medium transition-opacity duration-300 ease-in-out
      ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}
            >
              {animatedSubtitle}
            </p>
            <div
              className={`flex items-start transition-opacity duration-300 ease-in-out ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}
            >
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center bg-[#ffffff] rounded-full shadow-md hover:scale-105 transition-transform duration-300"
              >
                <span className="px-4 py-2 sm:px-6 sm:py-3 text-black text-xs sm:text-base font-medium">
                  Connect us
                </span>
                <span className="relative -mr-1 w-8 h-8 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center border-2 border-[#ffffff]">
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 text-[#ffffff]" />
                </span>
              </button>
            </div>
          </div>

          {/* RERA badge */}
          <div
            className="absolute bottom-2 sm:bottom-10 right-2 sm:right-8"
            style={{ zIndex: 5 }}
          >
            <div className="bg-white px-2 py-1 sm:px-6 sm:py-2 rounded-full shadow-lg flex items-center gap-1 sm:gap-2">
              <p className="text-black text-[10px] sm:text-xs md:text-base lg:text-base font-figtree font-medium leading-tight">
                RERA & BMRDA Approved Projects
              </p>
              <img
                src={AboveIcon}
                alt="Above Icon"
                className="w-3 sm:w-8 md:w-10 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
