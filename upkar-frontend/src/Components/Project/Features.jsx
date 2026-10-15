import React from 'react';

const Features = ({ project }) => {
  if (!project?.keyFeatures?.length) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="mb-12 text-[48px] font-[Figtree] font-semibold text-black">
        Features
      </h2>

      <div className="max-w-7xl mx-auto">
        <div className="bg-[#000814] rounded-3xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="lg:w-5/12 flex flex-col justify-center">
              <p className="text-white text-[20px] sm:text-[24px] font-light font-[Figtree] text-center mb-6">
                Upkar Spring Woods is a BMRDA, approved residential layout.
              </p>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={project.propertyImages?.[0]}
                  alt={project.projectName}
                  className="w-full h-60 object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="text-white space-y-4">
                {project.keyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-white/5"
                  >
                    <span className="text-[20px] font-light font-[Figtree]">
                      • {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
