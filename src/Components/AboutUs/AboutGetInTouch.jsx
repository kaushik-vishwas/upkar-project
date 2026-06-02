import React, { useState, useEffect } from 'react';
import { createEnquiry, getAllProjects } from '../../Api';
import { toast } from 'react-toastify';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import getinBtn from '../../assets/Icons/getinBtn8.png';

const GetInTouch = () => {
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
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
          // Hide hidden projects
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
    fetchProjects();
  }, []);

  useEffect(() => {
    if (Array.isArray(projects)) {
      const filtered = formData.projectStatus
        ? projects.filter((p) => p.projectStatus === formData.projectStatus)
        : [];
      setFilteredProjects(filtered);
      setFormData((prev) => ({ ...prev, projectId: '' }));
    }
  }, [formData.projectStatus, projects]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.projectStatus)
      errors.projectStatus = 'Project status is required';

    if (!formData.projectId) errors.projectId = 'Project is required';

    if (!formData.siteVisitDate)
      errors.siteVisitDate = 'Site visit date is required';

    if (!formData.location.trim()) errors.location = 'Location is required';

    if (!formData.name.trim()) errors.name = 'Full name is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formData.email))
      errors.email = 'Invalid email format';

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone) errors.phone = 'Phone number is required';
    else if (!phoneRegex.test(formData.phone))
      errors.phone = 'Enter valid 10 digit number';

    if (!formData.isExistingCustomer)
      errors.isExistingCustomer = 'Customer type is required';

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError);
      return;
    }

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
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };
  return (
    <div
      id="get-in-touch"
      className="w-full px-4 lg:px-10 py-0 sm:py-1 md:py-2 lg:py-3 font-figtree"
    >
      {/* <h2 className="mb-8 text-4xl sm:text-4xl md:text-4xl lg:text-4xl font-light leading-tight text-left">
        <span className="font-normal">Get in </span>
        <span className="font-semibold text-[#2D5C3A] ">Touch</span>
      </h2> */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl whitespace-nowrap">
          <span className="font-normal">Get in </span>
          <span className="font-semibold text-[#2D5C3A]">Touch</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      {/* <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 w-full shadow-xl"> */}
      <div
        className="bg-white rounded-3xl p-8 md:p-10 lg:p-8 
                w-full max-w-full lg:max-w-5xl 
                mx-auto shadow-xl"
      >
        <form
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Project Status*</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              className="w-full px-[15px] lg:px-[25px] py-[8px] lg:py-[10px] border border-black rounded-[20px] appearance-none pr-10"
              required
            >
              <option value="">Select a Project Status</option>
              <option value="ongoing">Ongoing Project</option>
              <option value="upcoming">Upcoming Project</option>
              <option value="completed">Completed Project</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>

          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Project*</label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full px-[15px] lg:px-[25px] py-[8px] lg:py-[10px] border border-black rounded-[20px] appearance-none pr-10"
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
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>

          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Preferred Site Visit Date*</label>
            <input
              type="date"
              name="siteVisitDate"
              value={formData.siteVisitDate}
              onChange={handleChange}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px]"
              required
            />
          </div>

          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Location*</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px]"
              required
            />
          </div>

          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Full Name*</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px]"
              required
            />
          </div>
          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Email ID*</label>
            <input
              type="email"
              name="email"
              placeholder="Email id"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px]"
              required
            />
          </div>
          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setFormData({ ...formData, phone: value });
              }}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px]"
              required
            />
          </div>

          <div className="relative w-full flex flex-col">
            <label className="mb-1 text-sm">Customer Type*</label>
            <select
              name="isExistingCustomer"
              value={formData.isExistingCustomer}
              onChange={handleChange}
              className="w-full px-[15px] h-[48px] border border-black rounded-[20px] appearance-none pr-10"
              required
            >
              <option value="">Are you an Existing customer?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 lg:col-span-2 flex justify-center"
          >
            <img
              src={getinBtn}
              alt="Send Enquiry"
              className="w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px] cursor-pointer hover:opacity-90 transition-opacity"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetInTouch;
