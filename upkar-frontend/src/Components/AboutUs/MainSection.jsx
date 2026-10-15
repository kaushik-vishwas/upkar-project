import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { getAllAboutMain } from '../../Api';
import { Link } from 'react-router-dom';

const MainSection = () => {
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [plotCount, setPlotCount] = useState(0);
  const [acresCount, setAcresCount] = useState(0);
  const [showHeading, setShowHeading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAboutMain();
        if (res?.aboutMainList?.length > 0) {
          setData(res.aboutMainList[0]);
        }
      } catch (err) {
        console.error('Error fetching About Main:', err);
      }
    };
    fetchData();
  }, []);

  const images = data?.mainImages || [];

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 200);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowHeading(true), 500);
  }, []);

  useEffect(() => {
    if (!data) return;

    const cleanNumber = (value) => {
      if (!value) return 0;
      return parseInt(value.replace(/[^0-9]/g, ''));
    };

    const animateCount = (target, setter, duration = 1000) => {
      let start = 0;
      const increment = target / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(counter);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateCount(cleanNumber(data.plotNumber), setPlotCount);
    animateCount(cleanNumber(data.acresNumber), setAcresCount);
  }, [data]);

  if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <div
      className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 font-[Figtree]"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
        transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center text-center">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-medium lg:text-[48px]  mb-6 leading-tight transition-opacity duration-1000 ${
              showHeading ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {data.heading?.split('|')[0]} <br />
            <span className="font-bold">{data.heading?.split('|')[1]}</span>
          </h2>

          <Link
            to="/ongoing-projects"
            className="inline-flex items-center bg-[#2D5C3A]  rounded-full shadow-md mb-10 hover:scale-105 transition-transform duration-300"
          >
            <span className="px-6 py-3 text-white font-medium">
              Explore Projects
            </span>
            <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
              <ArrowRight className="text-[#2D5C3A]" />
            </span>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
            <div
              className="rounded-2xl overflow-hidden relative h-52 shadow-md transition-all duration-500"
              style={{
                backgroundImage: `url(${data.plotImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-8px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0px)')
              }
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-4 left-4 text-white">
                <div className="text-4xl font-bold transition-all duration-1000">
                  {plotCount}+
                </div>
                <div>{data.plotTitle}</div>
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden relative h-52 shadow-md transition-all duration-500"
              style={{
                backgroundImage: `url(${data.acresImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'translateY(-8px)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'translateY(0px)')
              }
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute top-4 left-4 text-white">
                <div className="text-4xl font-bold transition-all duration-1000">
                  {acresCount}+
                </div>
                <div>{data.acresTitle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden relative h-[250px] sm:h-[300px] md:h-[380px] lg:h-[420px]">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === current
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-105'
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover rounded-[2rem]"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Are Heading */}
      <div className="flex items-center gap-4 mb-1 mt-14">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-figtree text-center whitespace-nowrap">
          <span className="font-normal">Who </span>
          <span className="font-semibold text-[#2D5C3A]">We Are</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      {/* Paragraph Section */}
      <div className="pt-2  max-w-[90%] mx-auto">
        <p className="mb-4 text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-center">
          {data.paragraph1}
        </p>
        <p className="mb-4 text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-center">
          {data.paragraph2}
        </p>
        <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify sm:text-center">
          {data.paragraph3}
        </p>
      </div>
    </div>
  );
};

export default MainSection;
