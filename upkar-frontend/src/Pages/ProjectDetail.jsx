import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Expand, X } from 'lucide-react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { getSingleProject } from '../Api';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';
import { AMENITY_ICONS } from '../assets/Amenities';
import areaIcon from '../assets/Icons/area1.png';
import waterIcon from '../assets/Icons/water1.png';
import unitIcon from '../assets/Icons/unit1.png';
import BrochureForm from '../Components/BrochureForm/BrochureForm';
import getinBtn from '../../src/assets/Icons/getinBtn8.png';
import { createEnquiry, getAllProjects } from '../Api';
import GetInTouch from '../Components/AboutUs/AboutGetInTouch';
import { toast } from 'react-toastify';
import { TbBuildingEstate } from 'react-icons/tb';
import { FaLocationDot } from 'react-icons/fa6';

const safeParseArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

const ProjectDetail = () => {
  const [formData, setFormData] = useState({
    projectStatus: '',
    projectId: '',
    siteVisitDate: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    isExistingCustomer: '',
  });

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        if (Array.isArray(allProjects)) setProjects(allProjects);
      } catch (err) {
        toast.error('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!formData.projectStatus) {
      setFilteredProjects([]);
      return;
    }

    const filtered = projects.filter(
      (p) => p.projectStatus === formData.projectStatus,
    );

    setFilteredProjects(filtered);
    setFormData((prev) => ({ ...prev, projectId: '' }));
  }, [formData.projectStatus, projects]);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryModal, setGalleryModal] = useState(null);
  const [visibleSections, setVisibleSections] = useState({});
  const [topImageIndex, setTopImageIndex] = useState(0);
  const sectionRefs = useRef({});
  const galleryRef = useRef(null);
  const mobileGalleryRef = useRef(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getSingleProject(projectId);
        if (res.success) setProject(res.project);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  useEffect(() => {
    if (showBrochureModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showBrochureModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.2 },
    );

    const elements = Object.values(sectionRefs.current);

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [project]);

  useEffect(() => {
    if (!project?.propertyImages?.length) return;

    const interval = setInterval(() => {
      setTopImageIndex((prev) => (prev + 1) % project.propertyImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [project]);

  const handleDownloadBrochure = async () => {
    try {
      const response = await fetch(project.brochureImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      let fileName = project.brochureFileName || 'brochure';

      if (!fileName.includes('.')) {
        const mime = project.brochureMimeType || blob.type;

        if (mime === 'application/pdf') fileName += '.pdf';
        else if (mime === 'image/png') fileName += '.png';
        else if (mime === 'image/jpeg') fileName += '.jpg';
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  if (loading) {
    return (
      <>
        <CmpltNavbar />
        <div className="pt-24">
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-xl text-gray-600">
              Loading project details...
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <CmpltNavbar />
        <div className="pt-24">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="text-xl text-gray-600 mb-4">Project not found</div>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-[#2D5C3A] text-white font-figtree rounded-md"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const masterPlans = safeParseArray(project.masterPlans);
  const keyFeatures = safeParseArray(project.keyFeatures);
  const amenities = safeParseArray(project.amenities);
  const sections = safeParseArray(project.sections);

  const openGalleryModal = (index) => {
    setGalleryModal({ index });
  };

  const closeGalleryModal = () => {
    setGalleryModal(null);
  };

  const changeGalleryImage = (direction) => {
    setGalleryModal((prev) => {
      const images = project.propertyImages || [];
      const newIndex =
        direction === 'next'
          ? (prev.index + 1) % images.length
          : (prev.index - 1 + images.length) % images.length;

      return { index: newIndex };
    });
  };

  const scrollLeft = (ref) => {
    ref.current?.scrollBy({
      left: -window.innerWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = (ref) => {
    ref.current?.scrollBy({
      left: window.innerWidth,
      behavior: 'smooth',
    });
  };

  const downloadBrochure = async () => {
    if (!project?.brochureImage) return;

    try {
      const response = await fetch(project.brochureImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      let fileName = project.brochureFileName || 'brochure';

      if (!fileName.includes('.')) {
        const mime = project.brochureMimeType || blob.type;
        if (mime === 'application/pdf') fileName += '.pdf';
        else if (mime === 'image/png') fileName += '.png';
        else if (mime === 'image/jpeg') fileName += '.jpg';
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };
  const imagesPerSlide = 3;
  const totalSlides = Math.ceil(
    (project.propertyImages?.length || 0) / imagesPerSlide,
  );

  const scrollLeftDesktop = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
      galleryRef.current?.scrollBy({
        left: -galleryRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRightDesktop = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
      galleryRef.current?.scrollBy({
        left: galleryRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const topImages = project.propertyImages || [];

  const rotatedImages = [
    topImages[topImageIndex],
    topImages[(topImageIndex + 1) % topImages.length],
    topImages[(topImageIndex + 2) % topImages.length],
  ];

  return (
    <>
      <CmpltNavbar />
      <div className="pt-24">
        <div
          className={`w-full transition-all ${showBrochureModal ? 'blur-sm pointer-events-none' : ''}`}
        >
          <div className="bg-white w-full">
            {/* TOP IMAGES */}
            <div className="max-w-6xl mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative col-span-1 md:col-span-2 overflow-visible">
                <img
                  src={rotatedImages[0]}
                  alt="Main"
                  className="h-[220px] md:h-[320px] w-full object-cover rounded-lg transition-opacity duration-700"
                />

                <div className=" absolute -bottom-2 font-figtree bg-white text-[#2D5C3A] text-sm sm:text-base md:text-[20px] px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 rounded-xl font-semibold">
                  RERA Certified
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                {rotatedImages.slice(1, 3).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Property ${i + 2}`}
                    className="h-[120px] md:h-[155px] w-full object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* BASIC INFO GRID */}
            <div
              data-id="basicInfo"
              ref={(el) => (sectionRefs.current['basicInfo'] = el)}
              className={`max-w-6xl mx-auto px-4 sm:px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6
  transition-all duration-1000 ease-out
  ${visibleSections['basicInfo'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              {/* LEFT */}
              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-xl sm:text-2xl md:text-[40px] font-figtree font-semibold">
                  {project.projectName}
                </h1>
                <div className="flex items-center gap-2 text-base  md:text-xl lg:text-xl text-black">
                  <FaLocationDot className="text-black" size={18} />
                  <p>{project.location}</p>
                </div>

                <div className="grid text-base md:text-xl lg:text-xl grid-cols-1 font-figtree sm:grid-cols-2 gap-4">
                  <InfoBox
                    // label="Unit Configuration"
                    label="Types of Plots"
                    value={project.unitConfiguration || '—'}
                    icon={<Home size={28} strokeWidth={1.6} />}
                  />

                  {/* <InfoBox
                    label="Water Supply"
                    value={project.waterSupply || '—'}
                    icon={waterIcon}
                  /> */}

                  <InfoBox
                    // label="Units"
                    label="Total No Plots"
                    value={project.totalUnits || '—'}
                    icon={unitIcon}
                  />
                  <InfoBox
                    label="Project Area"
                    value={project.projectArea || '—'}
                    icon={areaIcon}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4 lg:sticky lg:top-4">
                <div className="border rounded-lg p-4">
                  <p className="text-lg font-bold font-figtree sm:text-xl md:text-2xl">
                    ₹ {project.priceStartsFrom?.toLocaleString('en-IN') || '-'}
                  </p>
                </div>
                {/* <div className="border bg-[#2D5C3A] rounded-lg p-4">
                  <p className="font-semibold font-figtree mb-1 text-base  text-white capitalize">
                    {project.projectStatus || 'Ongoing'} Project
                  </p>
                  <p className="text-white">
                    Possession in{' '}
                    <span className="font-semibold font-figtree text-white">
                      {project.possessionDate
                        ? new Date(project.possessionDate).toLocaleDateString(
                            'en-US',
                            { month: 'long', year: 'numeric' },
                          )
                        : '—'}
                    </span>
                  </p>
                </div> */}

                {/* {project.brochureImage && (
              <div
                onClick={handleDownloadBrochure}
                className="border rounded-lg p-4 flex justify-between items-center cursor-pointer bg-gray-200"
              >
                <p className="font-medium font-figtree text-base sm:text-lg md:text-xl">
                  View Brochure
                </p>
                <Download size={16} />
              </div>
            )} */}
                {project.brochureImage && (
                  <div
                    onClick={() => setShowBrochureModal(true)}
                    className="border rounded-lg p-4 flex justify-between items-center cursor-pointer bg-gray-200"
                  >
                    <p className="font-medium font-figtree text-base sm:text-lg md:text-xl">
                      Download Brochure
                    </p>
                    <Download size={16} />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
                {/* KEY FEATURES */}
                {keyFeatures.length > 0 && (
                  <div
                    data-id="keyFeatures"
                    ref={(el) => (sectionRefs.current['keyFeatures'] = el)}
                    className={`transition-all duration-1000 ease-out
  ${visibleSections['keyFeatures'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {/* <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-4">
                      <span className="font-normal">Key</span>{' '}
                      <span className="font-semibold text-[#2D5C3A]">
                        Features
                      </span>
                    </h1> */}
                    <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-4 flex items-center justify-center gap-4">
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                      <span>
                        <span className="font-normal">Key</span>{' '}
                        <span className="font-semibold text-[#2D5C3A]">
                          Features
                        </span>
                      </span>
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                    </h1>

                    <ul className="grid grid-cols-1 font-figtree sm:grid-cols-2 gap-3">
                      {keyFeatures.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 border rounded-md px-3 py-2"
                        >
                          <TbBuildingEstate
                            className="text-black mt-1"
                            size={20}
                          />

                          <span className="text-base font-figtree lg:text-xl md:text-xl">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MASTER PLAN */}
                {masterPlans.length > 0 && (
                  <div
                    data-id="masterPlan"
                    ref={(el) => (sectionRefs.current['masterPlan'] = el)}
                    className={`transition-all duration-1000 ease-out
  ${visibleSections['masterPlan'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {/* <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-6">
                      <span className="font-normal">Floor</span>{' '}
                      <span className="font-semibold text-[#2D5C3A]">Plan</span>
                    </h1> */}
                    <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-6 flex items-center justify-center gap-4">
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                      <span>
                        <span className="font-normal">Layout</span>{' '}
                        <span className="font-semibold text-[#2D5C3A]">
                          Plan
                        </span>
                      </span>
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                    </h1>

                    {/* Plan Tabs - Scrollable on Mobile */}
                    {masterPlans.length > 1 && (
                      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 sm:justify-center">
                        {masterPlans.map((plan, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedPlanIndex(index)}
                            className={`px-4 sm:px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm sm:text-base flex-shrink-0 ${
                              selectedPlanIndex === index
                                ? 'bg-[#000000] text-white'
                                : 'bg-white text-gray-700 border border-gray-300'
                            }`}
                          >
                            {plan.planName || `${index + 1} BHK`}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Floor Plan Container */}
                    <div className="flex justify-center">
                      <div className="w-full max-w-[550px]">
                        {/* Image */}

                        <div className="relative w-full group rounded-lg overflow-hidden border-2 border-transparent border-gray-500 hover:border-[#2D5C3A] transition duration-300">
                          <img
                            src={masterPlans[selectedPlanIndex]?.planPhoto}
                            alt={
                              masterPlans[selectedPlanIndex]?.planName ||
                              'Floor Plan'
                            }
                            className="w-full h-[240px] sm:h-[320px] md:h-[400px] object-contain cursor-pointer"
                            onClick={() => setShowPlanPreview(true)}
                          />

                          <button
                            onClick={() => setShowPlanPreview(true)}
                            className="absolute top-3 right-3 bg-black/50 hover:bg-black text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100"
                          >
                            <Expand size={18} />
                          </button>
                        </div>

                        {/* Info Card */}
                        {/* <div className="w-full mt-4 bg-[#000000] text-white rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center"> */}
                        <div className="w-full mt-4 bg-[#000000] text-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center gap-4">
                          {/* <div>
                            <h3 className="text-xl sm:text-2xl font-semibold font-figtree text-white leading-tight mb-1">
                              {masterPlans[selectedPlanIndex]?.planName ||
                                'BHK'}{' '}
                              Floor plan
                            </h3>

                            {masterPlans[selectedPlanIndex]?.carpetArea && (
                              <p className="text-sm sm:text-base font-figtree text-gray-300">
                                Carpet Area -{' '}
                                {masterPlans[selectedPlanIndex].carpetArea} sq
                                ft
                              </p>
                            )}
                          </div> */}
                          <div className="flex flex-col items-center text-center">
                            <h3 className="text-xl sm:text-2xl font-semibold font-figtree text-white leading-tight mb-1">
                              {masterPlans[selectedPlanIndex]?.planName ||
                                'BHK'}{' '}
                              Layout plan
                            </h3>

                            {masterPlans[selectedPlanIndex]?.carpetArea && (
                              <p className="text-sm sm:text-base font-figtree text-gray-300">
                                Carpet Area -{' '}
                                {masterPlans[selectedPlanIndex].carpetArea} sq
                                ft
                              </p>
                            )}
                          </div>

                          {/* <button className="bg-white font-figtree text-[#0A1F44] px-4 sm:px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition whitespace-nowrap self-start sm:self-auto">
                        View Details !
                      </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AMENITIES */}
                {amenities.length > 0 && (
                  <div
                    data-id="amenities"
                    ref={(el) => (sectionRefs.current['amenities'] = el)}
                    className={`transition-all duration-1000 ease-out
  ${visibleSections['amenities'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {/* <h1 className="font-figtree text-[#2D5C3A] text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold">
                      Amenities
                    </h1> */}
                    <h1 className="font-figtree text-[#2D5C3A] text-2xl sm:text-3xl md:text-4xl mb-4 font-semibold flex items-center justify-center gap-4">
                      <span className="hidden sm:block flex-1 h-px bg-[#000000]"></span>
                      Amenities
                      <span className="hidden sm:block flex-1 h-px bg-[#000000]"></span>
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {amenities.map((amenity, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border rounded-md px-3 py-3"
                        >
                          {AMENITY_ICONS[amenity] && (
                            <img
                              src={AMENITY_ICONS[amenity]}
                              alt={amenity}
                              className="w-8 h-8 object-contain"
                            />
                          )}
                          <span className="text-base sm:text-lg md:text-xl">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ABOUT PROJECT */}
                {/* {project.aboutProject && (
                  <div
                    data-id="aboutProject"
                    ref={(el) => (sectionRefs.current['aboutProject'] = el)}
                    className={`transition-all duration-1000 ease-out
  ${visibleSections['aboutProject'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-3">
                      <span className="font-normal">About</span>{' '}
                      <span className="font-semibold text-[#2D5C3A]">
                        Project
                      </span>
                    </h1>
                    <p className="leading-normal text-justify font-figtree text-base sm:text-lg md:text-xl">
                      {project.aboutProject}
                    </p>
                  </div>
                )} */}
                {/* ABOUT PROJECT */}
                {project.aboutProject && (
                  <div
                    data-id="aboutProject"
                    ref={(el) => (sectionRefs.current['aboutProject'] = el)}
                    className={`transition-all duration-1000 ease-out
      ${visibleSections['aboutProject'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {/* <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-3">
                      <span className="font-normal">About</span>{' '}
                      <span className="font-semibold text-[#2D5C3A]">
                        Project
                      </span>
                    </h1> */}
                    <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-3 flex items-center justify-center gap-4">
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                      <span>
                        <span className="font-normal">About</span>{' '}
                        <span className="font-semibold text-[#2D5C3A]">
                          Project
                        </span>
                      </span>
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                    </h1>

                    {/* Main description */}
                    {/* {project.aboutProject.mainDescription && (
                      <p className="leading-normal text-justify font-figtree text-base sm:text-lg md:text-xl mb-6">
                        {project.aboutProject.mainDescription}
                      </p>
                    )} */}
                    {project.aboutProject.mainDescription && (
                      <div
                        className="leading-normal text-justify font-figtree text-base sm:text-lg md:text-xl mb-6 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: project.aboutProject.mainDescription,
                        }}
                      />
                    )}

                    {/* Heading + description blocks */}
                    {project.aboutProject.blocks?.length > 0 && (
                      <div className="space-y-4">
                        {project.aboutProject.blocks.map((block, i) => (
                          <div key={i}>
                            {block.heading && (
                              <p className="font-semibold font-figtree text-base sm:text-lg md:text-xl text-black">
                                {block.heading}
                              </p>
                            )}
                            {block.description && (
                              <p className="leading-normal text-justify font-figtree text-base sm:text-lg md:text-xl text-black">
                                {block.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* RERA */}
                {(project.reraDescription ||
                  project.noBrokerReraId ||
                  project.builderProjectReraId) && (
                  <div
                    data-id="rera"
                    ref={(el) => (sectionRefs.current['rera'] = el)}
                    className={`transition-all duration-1000 ease-out
  ${visibleSections['rera'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    <h1 className="font-figtree text-xl sm:text-2xl md:text-3xl mb-4">
                      <span className="font-semibold">
                        {project.projectName} -
                      </span>{' '}
                      <span className="font-light">
                        RERA & Legal Certificates
                      </span>
                    </h1>

                    <div className="space-y-2 text-base font-figtree sm:text-lg md:text-xl">
                      {/* {project.reraDescription && (
                        <p>{project.reraDescription}</p>
                      )} */}
                      {project.reraDescription && (
                        <div
                          className="font-figtree text-base sm:text-lg md:text-xl prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: project.reraDescription,
                          }}
                        />
                      )}
                      {project.noBrokerReraId && (
                        <p className="font-figtree">
                          <b>RERA ID:</b> {project.noBrokerReraId}
                        </p>
                      )}
                      {/* {project.builderProjectReraId && (
                        <p>
                          <b>Builder RERA ID:</b> {project.builderProjectReraId}
                        </p>
                      )} */}
                    </div>
                  </div>
                )}

                {project.propertyImages?.length > 0 && (
                  // <div className="w-full bg-white px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12">
                  <div>
                    {/* <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-3">
                      <span className="font-normal">Project</span>{' '}
                      <span className="font-semibold text-[#2D5C3A]">
                        Images
                      </span>
                    </h1> */}
                    <h1 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-3 flex items-center justify-center gap-4">
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                      <span>
                        <span className="font-normal">Project</span>{' '}
                        <span className="font-semibold text-[#2D5C3A]">
                          Images
                        </span>
                      </span>
                      <span className="hidden sm:block flex-1 h-px bg-[#2D5C3A]"></span>
                    </h1>

                    <div className="relative hidden sm:block">
                      <div
                        ref={galleryRef}
                        className="flex overflow-hidden snap-x snap-mandatory scroll-smooth pb-6"
                      >
                        {Array.from({
                          length: Math.ceil(project.propertyImages.length / 3),
                        }).map((_, i) => {
                          const chunk = project.propertyImages.slice(
                            i * 3,
                            i * 3 + 3,
                          );

                          return (
                            <div
                              key={i}
                              className="flex-shrink-0 w-full snap-center"
                            >
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {chunk.map((img, index) => {
                                  const globalIndex = i * 3 + index;
                                  return (
                                    <div
                                      key={index}
                                      className="rounded-lg overflow-hidden h-[300px] cursor-pointer"
                                      onClick={() =>
                                        openGalleryModal(globalIndex)
                                      }
                                    >
                                      <img
                                        src={img}
                                        alt={`project-${globalIndex}`}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Left Arrow */}
                      {/* <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition"
                        onClick={() => scrollLeft(galleryRef)}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button> */}
                      {currentSlide > 0 && (
                        <button
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md hover:scale-110 transition"
                          onClick={scrollLeftDesktop}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}

                      {/* Right Arrow */}
                      {/* <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 rounded-full shadow-md hover:scale-110 transition"
                        onClick={() => scrollRight(galleryRef)}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button> */}
                      {currentSlide < totalSlides - 1 && (
                        <button
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 rounded-full shadow-md hover:scale-110 transition"
                          onClick={scrollRightDesktop}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      )}
                    </div>

                    <div className="relative block sm:hidden mt-2">
                      <div
                        ref={mobileGalleryRef}
                        className="flex overflow-hidden snap-x snap-mandatory scroll-smooth pb-6"
                      >
                        {project.propertyImages.map((src, index) => (
                          <div
                            key={index}
                            className="flex-shrink-0 w-full h-[400px] rounded-lg overflow-hidden snap-center cursor-pointer"
                            onClick={() => openGalleryModal(index)}
                          >
                            <img
                              src={src}
                              alt={`project-mobile-${index}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-gray-800 p-2 rounded-full shadow-md"
                        onClick={() => scrollLeft(mobileGalleryRef)}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-md text-white p-2 rounded-full shadow-md"
                        onClick={() => scrollRight(mobileGalleryRef)}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {project?.locationEmbedUrl ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <div className="flex flex-col">
                      <div
                        className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer flex-1 min-h-[350px]"
                        onClick={() => {
                          if (project.locationUrl) {
                            window.open(
                              project.locationUrl,
                              '_blank',
                              'noopener,noreferrer',
                            );
                          }
                        }}
                      >
                        <iframe
                          title="Project Location"
                          src={project.locationEmbedUrl}
                          className="w-full h-full border-0 pointer-events-none"
                          loading="lazy"
                          allowFullScreen
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>

                    <div className="w-full font-figtree flex flex-col border border-gray-400 rounded-lg">
                      <div className="bg-white rounded-3xl p-8 md:p-10 w-full flex-1">
                        {/* GET IN TOUCH HEADING */}
                        <h2 className="font-figtree text-2xl sm:text-3xl md:text-4xl mb-6">
                          <span className="font-normal">Get In</span>{' '}
                          <span className="font-semibold text-[#2D5C3A]">
                            Touch
                          </span>
                        </h2>

                        <form
                          className="flex flex-col gap-5"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            try {
                              await createEnquiry(formData);
                              toast.success('Enquiry submitted successfully!');
                              setFormData({
                                projectStatus: '',
                                projectId: '',
                                siteVisitDate: '',
                                location: '',
                                name: '',
                                email: '',
                                phone: '',
                                isExistingCustomer: '',
                              });
                            } catch (err) {
                              toast.error(
                                err?.response?.data?.message ||
                                  'Something went wrong. Try again.',
                              );
                            }
                          }}
                        >
                          {/* PROJECT STATUS */}
                          <select
                            name="projectStatus"
                            value={formData.projectStatus}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          >
                            <option value="">Select Project Status</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                          </select>

                          {/* PROJECT LIST */}
                          <select
                            name="projectId"
                            value={formData.projectId}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                            disabled={!filteredProjects.length}
                          >
                            <option value="">Select Project</option>
                            {filteredProjects.map((p) => (
                              <option key={p._id} value={p._id}>
                                {p.projectName}
                              </option>
                            ))}
                          </select>

                          {/* SITE VISIT DATE */}
                          <input
                            type="date"
                            name="siteVisitDate"
                            value={formData.siteVisitDate}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          />

                          {/* NAME */}
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          />

                          {/* EMAIL */}
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          />

                          {/* PHONE */}
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          />

                          {/* LOCATION */}
                          <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          />

                          {/* EXISTING CUSTOMER */}
                          <select
                            name="isExistingCustomer"
                            value={formData.isExistingCustomer}
                            onChange={handleChange}
                            className="w-full px-5 py-3 border border-black rounded-2xl"
                            required
                          >
                            <option value="">
                              Are you an existing customer?
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>

                          {/* SUBMIT */}
                          <button
                            type="submit"
                            className="mt-4 flex justify-center"
                          >
                            <img
                              src={getinBtn}
                              alt="Send Enquiry"
                              className="max-w-[200px] sm:max-w-[180px] xs:max-w-[160px] w-full hover:opacity-90"
                            />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <GetInTouch />
                  </div>
                )}

                {/* SECTIONS */}
                {sections.length > 0 && (
                  <div
                    data-id="sections"
                    ref={(el) => (sectionRefs.current['sections'] = el)}
                    className={`space-y-8 pb-20 transition-all duration-1000 ease-out
  ${visibleSections['sections'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  >
                    {sections.map((section, index) => {
                      if (
                        !section.sectionName &&
                        !section.sectionDescription &&
                        !section.sectionImage
                      ) {
                        return null;
                      }

                      return (
                        <div key={index} className="space-y-4">
                          {/* Section Name */}
                          {section.sectionName && (
                            <h2 className="font-figtree text-2xl sm:text-3xl md:text-4xl text-[#2D5C3A] font-semibold">
                              {section.sectionName}
                            </h2>
                          )}

                          {/* Section Description */}
                          {section.sectionDescription && (
                            <p className="text-base font-figtree sm:text-lg md:text-xl text-black leading-relaxed">
                              {section.sectionDescription}
                            </p>
                          )}

                          {/* Section Image */}
                          {section.sectionImage && (
                            <img
                              src={section.sectionImage}
                              alt={
                                section.sectionName || `Section ${index + 1}`
                              }
                              className="w-full rounded-lg max-h-[500px] object-cover"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* FLOOR PLAN FULL PREVIEW MODAL */}
        {showPlanPreview && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={masterPlans[selectedPlanIndex]?.planPhoto}
                alt="Full Floor Plan"
                className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg border-2 border-[#2D5C3A]"
              />

              {/* Close Button */}
              <button
                onClick={() => setShowPlanPreview(false)}
                className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition"
              >
                <X size={22} />
              </button>
            </div>
          </div>
        )}

        {showBrochureModal && (
          <>
            {/* Dark semi-transparent overlay */}
            <div
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowBrochureModal(false)}
            ></div>

            {/* Modal container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl p-6 sm:p-10 w-full max-w-lg relative">
                {/* Close Button */}
                <button
                  onClick={() => setShowBrochureModal(false)}
                  className="absolute top-4 right-4 text-gray-700 hover:text-black"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Get Brochure
                </h2>

                <BrochureForm
                  projectId={project._id}
                  onSubmitSuccess={() => {
                    downloadBrochure();
                    setShowBrochureModal(false);
                  }}
                />
              </div>
            </div>
          </>
        )}

        {galleryModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={project.propertyImages[galleryModal.index]}
                alt="Preview"
                className="max-h-[80vh] w-auto max-w-[90vw] object-contain rounded-lg"
              />

              {/* Close */}
              <button
                onClick={closeGalleryModal}
                className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left */}
              <button
                onClick={() => changeGalleryImage('prev')}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right */}
              <button
                onClick={() => changeGalleryImage('next')}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/60 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const InfoBox = ({ label, value, icon }) => {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl">
      <div className="text-gray-500 flex items-center justify-center w-10 h-10">
        {typeof icon === 'string' ? (
          <img src={icon} alt={label} className="w-7 h-7 object-contain" />
        ) : (
          icon
        )}
      </div>

      <div>
        <p className="text-[20px] font-figtree text-black">{label}</p>
        <p className="text-[20px] font-figtree font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
