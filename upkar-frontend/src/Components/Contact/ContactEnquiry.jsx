import React, { useState, useEffect } from 'react';
import { createContactEnquiry, getAllProjects } from '../../Api';
import { toast } from 'react-toastify';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import getinBtn from '../../assets/Icons/getinBtn8.png';

const ContactEnquiry = () => {
  const [formData, setFormData] = useState({
    projectStatus: '',
    projectId: '',
    projectName: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    query: '',
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

      setFormData((prev) => ({
        ...prev,
        projectId: '',
        projectName: '',
      }));
    }
  }, [formData.projectStatus, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'projectId') {
      const selectedProject = filteredProjects.find((p) => p._id === value);

      setFormData({
        ...formData,
        projectId: value,
        projectName: selectedProject?.projectName || '',
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContactEnquiry(formData);
      toast.success('Enquiry submitted successfully!');

      setFormData({
        projectStatus: '',
        projectId: '',
        projectName: '',
        location: '',
        name: '',
        email: '',
        phone: '',
        query: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 py-10 font-figtree">
      <h2 className="mb-8 text-4xl font-light">
        <span className="font-medium">Get in </span>
        <span className="font-bold">Touch</span>
      </h2>

      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <form onSubmit={handleSubmit}>
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
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <KeyboardArrowDownOutlinedIcon />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-black rounded-[20px] px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-black rounded-[20px] px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-black rounded-[20px] px-4 py-2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm">Phone*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-black rounded-[20px] px-4 py-2"
              required
            />
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <label className="mb-1 text-sm">Your Query*</label>
            <textarea
              name="query"
              value={formData.query}
              onChange={handleChange}
              rows="4"
              className="border border-black rounded-[20px] px-4 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 lg:col-span-2 flex justify-center"
          >
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

export default ContactEnquiry;
