import React, { useState } from 'react';
import { createEventEnquiry } from '../../Api';
import { toast } from 'react-toastify';
import getinBtn from '../../assets/Icons/eventContact.png';
import image from '../../assets/event1.png';

const EventGetIn = () => {
  const [formData, setFormData] = useState({
    location: '',
    name: '',
    email: '',
    mobile: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { location, name, email, mobile } = formData;

    if (!location.trim()) {
      toast.error('Location is required');
      return false;
    }

    if (!name.trim()) {
      toast.error('Full Name is required');
      return false;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      toast.error('Name should contain only letters');
      return false;
    }

    if (!email.trim()) {
      toast.error('Email is required');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (!mobile.trim()) {
      toast.error('Phone number is required');
      return false;
    }

    if (mobile.length !== 10) {
      toast.error('Phone number must be 10 digits');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await createEventEnquiry({
        ...formData,
        location: formData.location.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
      });

      toast.success('Enquiry submitted successfully!');

      setFormData({
        location: '',
        name: '',
        email: '',
        mobile: '',
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 py-10 font-figtree">
      {/* <h2 className="text-4xl md:text-4xl lg:text-4xl mb-8 md:mb-12">
        <span className="font-normal">Get in</span>
        <span className="font-semibold text-[#2D5C3A]"> Touch</span>
      </h2> */}
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <div className="flex-1 h-[2px] bg-gray-300"></div>

        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl whitespace-nowrap">
          <span className="font-normal">Get in</span>
          <span className="font-semibold text-[#2D5C3A]"> Touch</span>
        </h2>

        <div className="flex-1 h-[2px] bg-gray-300"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className=" hidden lg:block w-full h-full">
            <img
              src={image}
              alt="Event"
              className="w-full h-full object-cover rounded-3xl shadow-xl"
            />
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="mb-1 text-sm">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 h-[48px] border border-black rounded-[20px]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm">Email ID*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 h-[48px] border border-black rounded-[20px]"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm">Phone Number*</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="px-4 h-[48px] border border-black rounded-[20px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-sm">Location*</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="px-4 h-[48px] border border-black rounded-[20px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="px-6 py-3 bg-black text-white rounded-xl">
                Submitting...
              </span>
            ) : (
              <img
                src={getinBtn}
                alt="Send Enquiry"
                className="w-full max-w-[200px] cursor-pointer hover:opacity-90 transition-opacity"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventGetIn;
