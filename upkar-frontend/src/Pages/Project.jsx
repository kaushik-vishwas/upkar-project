import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProject } from '../Api';
import PrjctMain from '../Components/Project/PrjctMain';
import Features from '../Components/Project/Features';
import PlotLayout from '../Components/Project/PlotLayout';
import Amenities from '../Components/Project/Amenities';
import AboutProject from '../Components/Project/AboutProject';
import PrjctGallery from '../Components/Project/PrjctGallery';
import Directions from '../Components/Project/Directions';
import PrjctGetinTouch from '../Components/Project/PrjctGetinTouch';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getSingleProject(projectId);
        if (res.success) {
          setProject(res.project);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Project not found</p>
      </div>
    );
  }

  return (
    <div>
      <CmpltNavbar />
      <div className="pt-24">
        <PrjctMain project={project} />
        <Features project={project} />
        <PlotLayout project={project} />
        <Amenities project={project} />
        <AboutProject project={project} />
        <PrjctGallery project={project} />
        <Directions project={project} />
        <PrjctGetinTouch project={project} />
      </div>
    </div>
  );
};

export default Project;
