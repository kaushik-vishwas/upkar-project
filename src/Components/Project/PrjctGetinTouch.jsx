import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import GetInTocuh1 from '../../assets/PrjctGetin.png';
import { createEnquiry } from '../../Api';
import getinBtn from '../../assets/Icons/getinBtn.png';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    projectType: '',
    siteVisitDate: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    isExistingCustomer: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEnquiry(formData);

      alert('Enquiry submitted successfully');

      setFormData({
        projectType: '',
        siteVisitDate: '',
        location: '',
        name: '',
        email: '',
        phone: '',
        isExistingCustomer: '',
      });
    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 py-6 sm:py-8 md:py-10 lg:py-12 mb-0 lg:mb-2 font-figtree">
      <h2 className="mb-4 lg:mb-12 text-3xl font-figtree sm:text-4xl md:text-5xl lg:text-[48px] font-light leading-tight">
        <span className="font-normal">Get in </span>
        <span className="font-semibold">Touch</span>
      </h2>

      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <div
          className="w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${GetInTocuh1})` }}
        >
          <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 py-10 gap-4 sm:gap-6 md:gap-8 lg:gap-0">
            <div className="text-white max-w-md text-center lg:text-left px-2 sm:px-4 mb-8 lg:mb-0">
              <h3 className="leading-snug sm:leading-snug font-figtree md:leading-normal lg:leading-relaxed block text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span>Ready to take the</span>
                <br />
                <span style={{ fontWeight: 300 }}>next step?</span>
                <span style={{ fontWeight: 600, display: 'block' }}>
                  Let's Connect!
                </span>
              </h3>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 w-full max-w-md sm:max-w-lg md:max-w-xl shadow-xl mx-auto lg:mx-0">
              <form
                className="flex flex-col items-center gap-5"
                onSubmit={handleSubmit}
              >
                <div className="relative w-full">
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-[15px] lg:px-[25px] py-[8px] lg:py-[10px] border border-black rounded-[20px] appearance-none pr-10"
                    required
                  >
                    <option value="">Select a Project Type</option>
                    <option value="ongoing">Ongoing Project</option>
                    <option value="upcoming">Upcoming Project</option>
                    <option value="completed">Completed Project</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <KeyboardArrowDownOutlinedIcon />
                  </div>
                </div>

                <div className="relative w-full flex flex-col">
                  <label className="mb-1 text-sm">
                    Preferred Site Visit Date
                  </label>
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
                    className="w-56 cursor-pointer hover:opacity-90 transition-opacity"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
