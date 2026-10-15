import React, { useState, useEffect } from 'react';
import { createEnquiry, getAllProjects } from '../../Api';
import { toast } from 'react-toastify';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import getinBtn from '../../assets/Icons/getinBtn8.png';

const PrjctDetailGetinTouch = () => {
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        if (Array.isArray(allProjects)) setProjects(allProjects);
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

  const handleSubmit = async (e) => {
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
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 font-figtree">
      <h2 className="mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light leading-tight text-left">
        <span className="font-normal">Get in </span>
        <span className="font-semibold">Touch</span>
      </h2>

      <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 w-full shadow-xl">
        <form
          className="flex flex-col items-center gap-5"
          onSubmit={handleSubmit}
        >
          <div className="relative w-full">
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

          <div className="relative w-full">
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
            <label className="mb-1 text-sm">Preferred Site Visit Date</label>
            <input
              type="date"
              name="siteVisitDate"
              value={formData.siteVisitDate}
              onChange={handleChange}
              className="w-full px-[15px] py-[8px] border border-black rounded-[20px]"
              required
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-[15px] py-[8px] border border-black rounded-[20px]"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-[15px] py-[8px] border border-black rounded-[20px]"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-[15px] py-[8px] border border-black rounded-[20px]"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-[15px] py-[8px] border border-black rounded-[20px]"
            required
          />

          <div className="relative w-full">
            <select
              name="isExistingCustomer"
              value={formData.isExistingCustomer}
              onChange={handleChange}
              className="w-full px-[15px] py-[8px] border border-black rounded-[20px] appearance-none pr-10"
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

          <button type="submit" className="mt-6 focus:outline-none">
            <img
              src={getinBtn}
              alt="Send Enquiry"
              className="w-full max-w-[200px] cursor-pointer hover:opacity-90 transition-opacity"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrjctDetailGetinTouch;
