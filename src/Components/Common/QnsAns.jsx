// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ArrowRight } from 'lucide-react';
// import { getQuestionsAPI } from '../../Api';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const QnsAns = () => {
//   const [openIndex, setOpenIndex] = useState(-1);
//   const [faqs, setFaqs] = useState([]);
//   const [isVisible, setIsVisible] = useState(false);

//   const token = localStorage.getItem('adminToken');
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchFAQs();
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsVisible(true), 200);
//     return () => clearTimeout(timer);
//   }, []);

//   const fetchFAQs = async () => {
//     try {
//       const data = await getQuestionsAPI(token);
//       setFaqs(data);
//     } catch (error) {
//       console.error('Error fetching FAQs:', error);
//       toast.error('Failed to fetch Q&As!');
//     }
//   };

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? -1 : index);
//   };

//   return (
//     <div
//       className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 font-[Figtree]"
//       style={{
//         opacity: isVisible ? 1 : 0,
//         transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
//         transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
//       }}
//     >
//       {/* SAME CONTAINER WIDTH AS MAP */}
//       <div className="w-full max-w-7xl mx-auto px-4 lg:px-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-16">
//           {/* LEFT SIDE */}
//           <div className="text-left p-4 flex flex-col justify-between h-full">
//             <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight">
//               Invest smarter with <br />
//               <span className="font-semibold text-[#2D5C3A]">
//                 Right Answers !
//               </span>
//             </h2>

//             <div className="hidden lg:block">
//               <p className="text-gray-600 mb-6 text-base sm:text-lg">
//                 Still any doubts in your mind?
//               </p>

//               <button
//                 onClick={() => navigate('/contact')}
//                 className="inline-flex items-center bg-[#2D5C3A] rounded-full shadow-md hover:scale-105 transition-transform duration-300"
//               >
//                 <span className="px-6 py-3 text-white text-sm sm:text-base font-medium">
//                   Connect us
//                 </span>

//                 <span className="relative -mr-1 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
//                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D5C3A]" />
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* FAQ SECTION */}
//           <div className="space-y-4">
//             {faqs.length === 0 && (
//               <p className="text-gray-500 text-center py-6">No Q&As found.</p>
//             )}

//             {faqs.map((faq, index) => {
//               const isOpen = openIndex === index;

//               return (
//                 <div
//                   key={index}
//                   className={`group border rounded-2xl overflow-hidden cursor-pointer
//                   transition-all duration-300 transform border-gray-200
//                   ${
//                     isOpen
//                       ? 'bg-[#2D5C3A] scale-[1.02]'
//                       : 'bg-white hover:bg-[#2D5C3A] hover:scale-[1.02]'
//                   }`}
//                 >
//                   <button
//                     onClick={() => toggleFAQ(index)}
//                     className="w-full flex items-center justify-between p-5 text-left"
//                   >
//                     <span
//                       className={`pr-4 text-base sm:text-lg md:text-xl lg:text-xl
//                       font-medium transition-colors duration-300
//                       ${
//                         isOpen
//                           ? 'text-white'
//                           : 'text-black group-hover:text-white'
//                       }`}
//                     >
//                       {index + 1}. {faq.question}
//                     </span>

//                     <ChevronDown
//                       className={`w-5 h-5 flex-shrink-0 transition-all duration-300
//                       ${
//                         isOpen
//                           ? 'text-white rotate-180'
//                           : 'text-gray-600 group-hover:text-white'
//                       }`}
//                     />
//                   </button>

//                   {/* ANSWER */}
//                   <div
//                     className="overflow-hidden transition-all duration-500"
//                     style={{
//                       maxHeight: isOpen ? '300px' : '0px',
//                       opacity: isOpen ? 1 : 0,
//                     }}
//                   >
//                     <div className="px-5 pb-5 bg-white">
//                       <p className="text-black text-base sm:text-lg md:text-xl lg:text-xl font-normal">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QnsAns;

import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight, X } from 'lucide-react';
import { getQuestionsAPI } from '../../Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// ─── Investment Modal ────────────────────────────────────────────────────────

const InvestmentModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';

    if (!form.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Enter a valid email';
    }

    if (!form.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(form.phone.replace(/\s+/g, ''))) {
      e.phone = 'Enter a valid 10-digit phone number';
    }

    if (!agreed) e.agreed = 'You must authorise to proceed';

    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        'http://localhost:5000/api/send-investment-email',
        // 'https://upkar-backend.onrender.com/api/send-investment-email',
        'https://upkar.delicod.com/api/send-investment-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        },
      );

      if (!res.ok) throw new Error('Failed to send');

      toast.success('Submitted successfully!');

      handleClose();
    } catch (err) {
      toast.error('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ name: '', email: '', phone: '' });
    setAgreed(true);
    setErrors({});
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl p-8 sm:p-10 border-2 border-[#2D5C3A] shadow-xl font-[Figtree]"
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-800 hover:bg-black/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
          Make a Smart Investment !!!
        </h2>

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full rounded-xl px-5 py-3.5 bg-[#fdfdfd] border text-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#2D5C3A]/40
            ${errors.name ? 'border-red-400' : 'border-[#2D5C3A]'}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full rounded-xl px-5 py-3.5 bg-[#fdfdfd] border text-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#2D5C3A]/40
            ${errors.email ? 'border-red-400' : 'border-[#2D5C3A]'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full rounded-xl px-5 py-3.5 bg-[#fdfdfd] border text-gray-700 text-sm outline-none focus:ring-2 focus:ring-[#2D5C3A]/40
            ${errors.phone ? 'border-red-400' : 'border-[#2D5C3A]'}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-3 mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 w-4 h-4 accent-[#2D5C3A]"
          />
          <label className="text-xs text-gray-600">
            I authorise Upkar Group & its representatives to contact me via
            Email/SMS/Call.
          </label>
        </div>

        {errors.agreed && (
          <p className="text-red-500 text-xs mb-4">{errors.agreed}</p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center bg-[#2D5C3A] rounded-full shadow-md hover:scale-105 transition-transform duration-300 disabled:opacity-60"
        >
          <span className="px-6 py-3 text-white text-sm font-medium">
            {loading ? 'Sending...' : 'Submit'}
          </span>

          {!loading && (
            <span className="relative -mr-1 w-11 h-11 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
              <ArrowRight className="w-4 h-4 text-[#2D5C3A]" />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const QnsAns = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const [faqs, setFaqs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFAQs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const fetchFAQs = async () => {
    try {
      const data = await getQuestionsAPI(token);
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to fetch Q&As!');
    }
  };

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? -1 : index);

  return (
    <>
      <InvestmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <div
        className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 font-[Figtree]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0px)' : 'translateY(40px)',
          transition: 'all 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 lg:gap-16">
            {/* LEFT SIDE */}
            <div className="text-left p-4 flex flex-col justify-between h-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] leading-tight">
                Invest smarter with <br />
                <span className="font-semibold text-[#2D5C3A]">
                  Right Answers !
                </span>
              </h2>

              <div className=" ">
                <p className="text-gray-600 mb-6 text-base sm:text-lg">
                  Still any doubts in your mind?
                </p>

                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center bg-[#2D5C3A] rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <span className="px-6 py-3 text-white text-sm sm:text-base font-medium">
                    Apply
                  </span>
                  <span className="relative -mr-1 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2D5C3A]">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D5C3A]" />
                  </span>
                </button>
              </div>
            </div>

            {/* FAQ SECTION */}
            <div className="space-y-4">
              {faqs.length === 0 && (
                <p className="text-gray-500 text-center py-6">No Q&As found.</p>
              )}

              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className={`group border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 transform border-gray-200
                    ${isOpen ? 'bg-[#2D5C3A] scale-[1.02]' : 'bg-white hover:bg-[#2D5C3A] hover:scale-[1.02]'}`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <span
                        className={`pr-4 text-base sm:text-lg md:text-xl lg:text-xl font-medium transition-colors duration-300
                        ${isOpen ? 'text-white' : 'text-black group-hover:text-white'}`}
                      >
                        {index + 1}. {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 flex-shrink-0 transition-all duration-300
                        ${isOpen ? 'text-white rotate-180' : 'text-gray-600 group-hover:text-white'}`}
                      />
                    </button>

                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isOpen ? '300px' : '0px',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="px-5 pb-5 bg-white">
                        <p className="text-black text-base sm:text-lg md:text-xl lg:text-xl font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QnsAns;
