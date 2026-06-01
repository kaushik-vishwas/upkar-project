import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllTeamMembers } from '../../Api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [activeCard, setActiveCard] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await getAllTeamMembers();
        if (res?.members?.length > 0) {
          setTeamMembers(res.members);
          setTimeout(() => setAnimate(true), 150);
        }
      } catch (err) {
        console.error('Error fetching team:', err);
      }
    };

    fetchTeam();
  }, []);

  const nextSlide = () => {
    if (currentIndex < teamMembers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleMobileTouch = () => {
    setActiveCard(true);

    setTimeout(() => {
      setActiveCard(false);
    }, 2000);
  };

  return (
    <div
      className="w-full bg-white px-4 lg:px-10 py-8 font-[Figtree]"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <div className="flex items-center gap-4 mb-8 mt-12">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-3xl lg:text-4xl whitespace-nowrap">
          <span className="font-normal">Our </span>
          <span className="font-semibold text-[#2D5C3A]">Team</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      {/* MOBILE SLIDER */}
      <div className="relative sm:hidden">
        {teamMembers.length > 0 && (
          <div className="overflow-hidden">
            <div
              onClick={handleMobileTouch}
              className={`bg-white rounded-lg shadow-md border-2 cursor-pointer 
              transition-all duration-300
              ${
                activeCard
                  ? 'border-[#2D5C3A] scale-[1.03] shadow-xl'
                  : 'border-gray-300'
              }`}
            >
              <div className="w-full h-64 bg-gray-200">
                <img
                  src={teamMembers[currentIndex]?.memberImage}
                  alt={teamMembers[currentIndex]?.memberName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 text-center border-t">
                <h3 className="font-semibold text-gray-900">
                  {teamMembers[currentIndex]?.memberName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {teamMembers[currentIndex]?.memberPosition}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentIndex > 0 && (
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {currentIndex < teamMembers.length - 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/40 backdrop-blur-md p-2 rounded-full shadow-md hover:scale-110 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-5 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-transparent cursor-pointer transition-all duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.10)';
              e.currentTarget.style.border = '2px solid #2D5C3A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '';
              e.currentTarget.style.border = '2px solid transparent';
            }}
          >
            <div className="w-full h-56 bg-gray-200">
              <img
                src={member.memberImage}
                alt={member.memberName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 text-center border-t">
              <h3 className="font-semibold text-gray-900">
                {member.memberName}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {member.memberPosition}
              </p>
            </div>
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No team members found.</p>
      )}
    </div>
  );
};

export default Team;
