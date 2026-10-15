import React, { useState, useEffect } from "react";
import { getCertifications } from "../../Api";

const Certification = () => {
  const [certifications, setCertifications] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const data = await getCertifications(token);
        setCertifications(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCerts();
  }, [token]);

  return (
    <div className="w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 font-[Figtree]">
      <div className="bg-gray-100 py-10 sm:py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
            <div className="lg:flex-shrink-0 text-center lg:text-left w-full lg:w-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light leading-tight"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                Certifications
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full lg:flex-1">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="mb-3">
                    <img
                      src={cert.icon}
                      alt={cert.heading}
                      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                    />
                  </div>

                  <p
                    className="text-black text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-tight"
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontWeight: 100,
                    }}
                  >
                    {cert.heading}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;
