import React, { useEffect, useState } from 'react';
import {
  getAllLocations,
  createContactEnquiry,
  getAllProjects,
} from '../../Api';
import { toast } from 'react-toastify';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import getinBtn from '../../assets/Icons/submitBtn.png';
import { ArrowRight } from 'lucide-react';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [activeLocation, setActiveLocation] = useState(null);

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [formData, setFormData] = useState({
    projectStatus: '',
    projectId: '',
    projectName: '',
    // location: '',
    name: '',
    email: '',
    phone: '',
    query: '',
    consent: false,
  });

  useEffect(() => {
    fetchLocations();
    fetchProjects();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await getAllLocations();
      if (res.success && res.data.length > 0) {
        setLocations(res.data);
        setActiveLocation(res.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch locations', error);
    }
  };

  // const fetchProjects = async () => {
  //   try {
  //     const allProjects = await getAllProjects();
  //     if (Array.isArray(allProjects)) setProjects(allProjects);
  //   } catch (error) {
  //     console.error('Error fetching projects:', error);
  //     toast.error('Failed to fetch projects!');
  //   }
  // };

  const fetchProjects = async () => {
    try {
      const allProjects = await getAllProjects();

      if (Array.isArray(allProjects)) {
        //  remove hidden projects
        const visibleProjects = allProjects.filter(
          (p) => p.isVisible !== false,
        );

        setProjects(visibleProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects!');
    }
  };

  useEffect(() => {
    if (Array.isArray(projects)) {
      const filtered = formData.projectStatus
        ? projects.filter((p) => p.projectStatus === formData.projectStatus)
        : [];

      setFilteredProjects(filtered);

      setFormData((prev) => ({
        ...prev,
        projectId: '',
        projectName: '',
      }));
    }
  }, [formData.projectStatus, projects]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'projectId') {
      const selectedProject = filteredProjects.find((p) => p._id === value);

      setFormData({
        ...formData,
        projectId: value,
        projectName: selectedProject?.projectName || '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const validateForm = () => {
    const {
      projectStatus,
      projectId,
      // location,
      name,
      email,
      phone,
      query,
      consent,
    } = formData;

    if (!projectStatus) return 'Please select project status.';
    if (!projectId) return 'Please select project.';
    // if (!location.trim()) return 'Location is required.';
    if (!name.trim()) return 'Full name is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address.';

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) return 'Phone number must be 10 digits.';

    if (!query.trim()) return 'Query field cannot be empty.';
    if (!consent) return 'Please authorize before submitting the enquiry.';

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    try {
      await createContactEnquiry(formData);

      //  Send email
      // await fetch('http://localhost:5000/api/contact/send-contact-email', {
      //   // await fetch(
      //   //   'https://upkar-backend.onrender.com/api/contact/send-contact-email',
      //   //   {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      toast.success('Enquiry submitted successfully!');

      setFormData({
        projectStatus: '',
        projectId: '',
        projectName: '',
        // location: '',
        name: '',
        email: '',
        phone: '',
        query: '',
        consent: false,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };

  const handleMapClick = () => {
    if (activeLocation?.locationUrl) {
      window.open(activeLocation.locationUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 font-figtree">
      <div className="flex items-center justify-center mb-12">
        <div className="hidden lg:block flex-1 h-[1px] bg-gray-300 mr-6"></div>

        <h2 className="text-3xl sm:text-3xl md:text-4xl font-figtree text-center whitespace-nowrap">
          <span className="font-normal">Project</span>{' '}
          <span className="font-semibold text-[#2D5C3A]">Enquiries</span>
        </h2>

        <div className="hidden lg:block flex-1 h-[1px] bg-gray-300 ml-6"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-stretch">
        <div className="flex flex-col h-full">
          <div className="flex flex-wrap gap-6 mb-6 border-b pb-4">
            {locations.map((loc) => (
              <button
                key={loc._id}
                onClick={() => setActiveLocation(loc)}
                className={`uppercase tracking-wide font-medium transition-colors ${
                  activeLocation?._id === loc._id
                    ? 'text-[#2D5C3A] border-b-2 border-[#2D5C3A]'
                    : 'text-black hover:text-black'
                }`}
              >
                {loc.title}
              </button>
            ))}
          </div>

          {activeLocation && (
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer flex-1 min-h-[400px]"
              onClick={handleMapClick}
            >
              <iframe
                key={activeLocation._id}
                title={activeLocation.title}
                src={activeLocation.embedUrl}
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}
        </div>

        <div className="border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#2D5C3A] text-white text-center py-4 px-4 rounded-t-2xl">
            <h1 className="text-base md:text-lg lg:text-lg font-normal">
              We'd be delighted to connect regarding our customized offers
            </h1>
          </div>

          <div className="p-8 bg-white rounded-b-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative flex flex-col">
                <label className="mb-1 text-sm">Project Status*</label>
                <select
                  name="projectStatus"
                  value={formData.projectStatus}
                  onChange={handleChange}
                  className="border border-black rounded-[20px] px-4 py-2 appearance-none pr-10"
                  required
                >
                  <option value="">Select a Project Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <KeyboardArrowDownOutlinedIcon />
                </div>
              </div>

              <div className="relative flex flex-col">
                <label className="mb-1 text-sm">Project*</label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="border border-black rounded-[20px] px-4 py-2 appearance-none pr-10"
                  required
                  disabled={
                    !formData.projectStatus || filteredProjects.length === 0
                  }
                >
                  <option value="">Select a Project</option>
                  {filteredProjects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                name="name"
                placeholder="Full Name*"
                value={formData.name}
                onChange={handleChange}
                className="border border-black rounded-[20px] px-4 py-2 w-full"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
                className="border border-black rounded-[20px] px-4 py-2 w-full"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={(e) => {
                  const onlyNumbers = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, phone: onlyNumbers });
                }}
                maxLength={10}
                className="border border-black rounded-[20px] px-4 py-2 w-full"
                required
              />
              {/* <input
                type="text"
                name="location"
                placeholder="Location*"
                value={formData.location}
                onChange={handleChange}
                className="border border-black rounded-[20px] px-4 py-2 w-full"
                required
              /> */}

              <textarea
                name="query"
                placeholder="Your Query*"
                rows="4"
                value={formData.query}
                onChange={handleChange}
                className="border border-black rounded-[20px] px-4 py-2 w-full"
                required
              />

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-[#2C86A6] cursor-pointer"
                  required
                />
                <p className="text-sm  text-gray-600 text-start">
                  I authorise <span className="font-semibold">Upkar Group</span>{' '}
                  and its representatives to contact me with updates and
                  notifications via Email/SMS/WhatsApp/Call. This will override
                  DND/NDNC.
                </p>
              </div>

              <button type="submit" className="flex justify-center mt-6 w-full">
                <span className="inline-flex items-center bg-[#2D5C3A] rounded-full shadow-md hover:scale-105 transition-transform duration-300">
                  <span className="px-6 py-2 sm:py-3 text-white text-sm sm:text-base font-medium">
                    Submit
                  </span>

                  <span className="relative -mr-1 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D5C3A]" />
                  </span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;
