import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllReadMore } from '../../Api';
import Navbar from '../Common/NavbarHome';

const ReadMoreDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllReadMore();
      const found = res.data.find((item) => item._id === id);
      setArticle(found);
    } catch (error) {
      console.error(error);
    }
  };

  if (!article) return null;

  return (
    <>
      <Navbar />
      <div className="pt-24"></div>
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold font-figtree mb-10 leading-tight">
          {article.heading}
        </h1>

        {/* Image with hover effect */}
        <div className="w-full mb-10 rounded-2xl overflow-hidden border-2 border-gray-300 hover:border-[#2D5C3A] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.03]">
          <img
            src={article.mainImage}
            alt={article.heading}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Description */}
        <div className="text-gray-700 text-lg leading-relaxed font-figtree text-justify space-y-4">
          {article.description}
        </div>
      </div>
    </>
  );
};

export default ReadMoreDetails;
