import React, { useState, useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { createCareerEnquiry } from '../../Api';
import { toast } from 'react-toastify';

const JoinTeamModal = ({ role, onClose }) => {
  const [formData, setFormData] = useState({
    serviceInterestedIn: '',
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceInterestedIn: role,
    }));
  }, [role]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      e.target.value = null;
      return;
    }

    setResume(file);
  };

  const handleSubmit = async () => {
    const { serviceInterestedIn, name, email, phone, location } = formData;

    if (!serviceInterestedIn || !name || !email || !phone || !location) {
      toast.error('Please fill all fields');
      return;
    }

    if (!resume) {
      toast.error('Please upload your resume (PDF)');
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        form.append(key, value),
      );
      form.append('resume', resume);

      await createCareerEnquiry(form);

      toast.success('Enquiry submitted! We’ll reach out soon.');
      onClose();
    } catch (error) {
      toast.error('Failed to submit enquiry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative bg-white w-full max-w-lg rounded-2xl p-6 z-10">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Apply for <span className="text-[#2D5C3A]">{role}</span> role.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            disabled
            value={formData.serviceInterestedIn}
            className="md:col-span-2 w-full px-4 py-3 border rounded-lg bg-gray-100"
          />

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Upload Resume (PDF only)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {resume && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {resume.name}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 flex items-center bg-[#2D5C3A] rounded-full disabled:opacity-70"
        >
          <span className="px-6 py-3 text-white">
            {loading ? 'Submitting...' : 'Submit'}
          </span>
          <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
            <ArrowRight className="text-[#2D5C3A]" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default JoinTeamModal;
