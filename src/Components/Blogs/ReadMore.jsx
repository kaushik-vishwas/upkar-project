import React, { useState, useEffect, useRef } from 'react';
import { getAllReadMore } from '../../Api';
import { useNavigate } from 'react-router-dom';

const ReadMore = () => {
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState({});
  const navigate = useNavigate();
  const articleRefs = useRef({});

  useEffect(() => {
    const fetchReadMore = async () => {
      try {
        const res = await getAllReadMore();
        setArticles(res.data || []);
      } catch (error) {
        console.error('Error fetching readmore:', error);
      }
    };
    fetchReadMore();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleArticles((prev) => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    Object.values(articleRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [articles]);

  const getLimitedText = (text) => {
    const words = text.trim().split(/\s+/);
    if (words.length > 40) {
      return words.slice(0, 40).join(' ') + '...';
    }
    return text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
    };
  };

  return (
    <div className="w-full bg-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}

        <div className="flex items-center justify-center mb-12">
          {/* LEFT LINE */}
          <div className="flex-1 h-[1px] bg-gray-300 mr-3 sm:mr-6"></div>

          {/* TITLE */}
          <h2 className="text-3xl sm:text-3xl md:text-4xl font-semibold text-[#2D5C3A] font-figtree text-center whitespace-nowrap">
            Blogs
          </h2>

          {/* RIGHT LINE */}
          <div className="flex-1 h-[1px] bg-gray-300 ml-3 sm:ml-6"></div>
        </div>
        <div className="space-y-12">
          {articles.map((article) => {
            const { day, month, year } = formatDate(article.createdAt);

            return (
              <div
                key={article._id}
                data-id={article._id}
                ref={(el) => (articleRefs.current[article._id] = el)}
                className={`flex flex-col lg:flex-row gap-8 items-start 
                  transition-all duration-1000 ease-out
                  ${visibleArticles[article._id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                {/* IMAGE */}
                <div className="w-full lg:w-1/3">
                  <div className="relative shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={article.mainImage}
                      alt={article.heading}
                      className="w-full h-48 lg:h-56 object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div
                  className={`w-full lg:w-2/3 space-y-4 border border-[#DADADA] lg:border-l-0 p-4 lg:pl-32 bg-white
                    transition-all duration-1000 ease-out
                    ${visibleArticles[article._id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                  {/* Title */}
                  <h3 className="font-semibold font-figtree text-[26px] md:text-[32px]">
                    {article.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-xl lg:text-xl">
                    {getLimitedText(article.description)}
                  </p>

                  {/* Show Full Article */}
                  <span
                    onClick={() => navigate(`/read-more/${article._id}`)}
                    className="inline-block mt-2 text-[#2D5C3A]  rounded-xl font-medium cursor-pointer hover:text-[#244c2f] transition-all duration-300"
                    style={{
                      animation: 'moveUpDown 1.5s ease-in-out infinite',
                    }}
                  >
                    Show Full Article →
                  </span>
                </div>
              </div>
            );
          })}

          {articles.length === 0 && (
            <p className="text-center text-gray-500 py-10">
              No articles found.
            </p>
          )}
        </div>
      </div>
      <style>
        {`
@keyframes moveUpDown {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0px); }
}
`}
      </style>
    </div>
  );
};

export default ReadMore;
