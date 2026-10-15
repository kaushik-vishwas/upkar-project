import React from 'react';

const AboutProject = ({ project }) => {
  if (!project) return null;

  if (!project.aboutProject && !project.reraDescription) return null;

  return (
    <div className="w-full bg-white py-8 md:py-16 px-4 md:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
        {project.aboutProject && (
          <div>
            <h2 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-figtree text-black">
              <span className="font-semibold">About</span>{' '}
              <span className="font-light">Project</span>
            </h2>
            <p className="font-figtree font-light text-base sm:text-lg md:text-xl lg:text-2xl text-[#000000] leading-relaxed md:leading-snug max-w-4xl">
              {project.aboutProject}
            </p>
          </div>
        )}

        {(project.reraDescription ||
          project.noBrokerReraId ||
          project.builderProjectReraId) && (
          <div>
            <h3 className="mb-4 md:mb-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-figtree text-black">
              <span className="font-semibold">RERA</span>{' '}
              <span className="font-light">Information</span>
            </h3>

            {project.reraDescription && (
              <p className="font-figtree font-light text-base sm:text-lg md:text-xl lg:text-2xl text-[#000000] leading-relaxed md:leading-snug mb-4">
                {project.reraDescription}
              </p>
            )}

            <div className="space-y-2 md:space-y-3 pt-2">
              {project.noBrokerReraId && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-figtree text-[#000000]">
                  <span className="font-light">NoBroker RERA Id - </span>
                  <span className="font-bold">{project.noBrokerReraId}</span>
                </p>
              )}

              {project.builderProjectReraId && (
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-figtree text-[#000000]">
                  <span className="font-light">Builder Project RERA Id - </span>
                  <span className="font-bold break-all">
                    {project.builderProjectReraId}
                  </span>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutProject;
