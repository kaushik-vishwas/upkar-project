// import React, { useState, useEffect } from 'react';
// import { createEnquiry, getAllProjects } from '../../Api';
// import { toast } from 'react-toastify';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// const BrochureForm = ({ projectId, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState({
//     projectStatus: '',
//     projectId: projectId || '',
//     siteVisitDate: '',
//     location: '',
//     name: '',
//     email: '',
//     phone: '',
//     isExistingCustomer: '',
//   });

//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const allProjects = await getAllProjects();
//         if (Array.isArray(allProjects)) setProjects(allProjects);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//         toast.error('Failed to fetch projects!');
//       }
//     };
//     fetchProjects();
//   }, []);

//   useEffect(() => {
//     if (Array.isArray(projects)) {
//       const filtered = formData.projectStatus
//         ? projects.filter((p) => p.projectStatus === formData.projectStatus)
//         : [];
//       setFilteredProjects(filtered);
//       if (!filtered.find((p) => p._id === formData.projectId)) {
//         setFormData((prev) => ({ ...prev, projectId: '' }));
//       }
//     }
//   }, [formData.projectStatus, projects]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createEnquiry(formData);
//       toast.success('Brochure downloaded successfully!');
//       setFormData({
//         projectStatus: '',
//         projectId: projectId || '',
//         siteVisitDate: '',
//         location: '',
//         name: '',
//         email: '',
//         phone: '',
//         isExistingCustomer: '',
//       });
//       if (onSubmitSuccess) onSubmitSuccess();
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         error?.response?.data?.message || 'Something went wrong. Try again.',
//       );
//     }
//   };

//   return (
//     <div className="max-h-[400px] overflow-y-auto p-4 bg-white rounded-3xl shadow-lg font-figtree">
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         {/* Project Status */}
//         <div className="relative w-full">
//           <select
//             name="projectStatus"
//             value={formData.projectStatus}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-xl appearance-none pr-10"
//             required
//           >
//             <option value="">Select a Project Status</option>
//             <option value="ongoing">Ongoing Project</option>
//             <option value="upcoming">Upcoming Project</option>
//             <option value="completed">Completed Project</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//             <KeyboardArrowDownOutlinedIcon />
//           </div>
//         </div>

//         <div className="relative w-full">
//           <select
//             name="projectId"
//             value={formData.projectId}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-xl appearance-none pr-10"
//             required
//             disabled={!formData.projectStatus || filteredProjects.length === 0}
//           >
//             <option value="">Select a Project</option>
//             {filteredProjects.map((p) => (
//               <option key={p._id} value={p._id}>
//                 {p.projectName}
//               </option>
//             ))}
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//             <KeyboardArrowDownOutlinedIcon />
//           </div>
//         </div>

//         <input
//           type="date"
//           name="siteVisitDate"
//           value={formData.siteVisitDate}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-xl"
//           required
//         />

//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           value={formData.location}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-xl"
//           required
//         />

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-xl"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-xl"
//           required
//         />

//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full px-4 py-2 border rounded-xl"
//           required
//         />

//         <div className="relative w-full">
//           <select
//             name="isExistingCustomer"
//             value={formData.isExistingCustomer}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-xl appearance-none pr-10"
//             required
//           >
//             <option value="">Are you an existing customer?</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//             <KeyboardArrowDownOutlinedIcon />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-[#2D5C3A] text-white px-6 py-2 rounded-xl hover:bg-green-900 transition mt-2"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BrochureForm;

import React, { useState } from 'react';
import { createEnquiry } from '../../Api';
import { toast } from 'react-toastify';

const BrochureForm = ({ projectId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEnquiry(formData);
      toast.success('Brochure downloaded successfully!');
      setFormData({ name: '', email: '', phone: '' });
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Try again.',
      );
    }
  };

  return (
    <div className="max-h-[400px] overflow-y-auto p-4 bg-white rounded-3xl shadow-lg font-figtree">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
          required
        />

        <button
          type="submit"
          className="bg-[#2D5C3A] text-white px-6 py-2 rounded-xl hover:bg-green-900 transition mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BrochureForm;
