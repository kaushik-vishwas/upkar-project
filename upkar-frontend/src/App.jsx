// import React, { useEffect, useState, useRef } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from 'react-router-dom';
// import { ChevronUp } from 'lucide-react';
// import logo from './assets/logo.png';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Footer from './Components/Common/Footer';
// import Home from './Pages/Home';
// import AboutUs from './Pages/AboutUs';
// import CompletedPrjcts from './Pages/CompletedPrjcts';
// import UpcomingPrjcts from './Pages/UpcomingPrjcts';
// import OngoingPrjcts from './Pages/OngoingPrjcts';
// import ProjectDetail from './Pages/ProjectDetail';
// import Event from './Pages/Event';
// import Career from './Pages/Career';
// import Blogs from './Pages/Blogs';
// import Contact from './Pages/Contact';
// import AdminDashboard from './AdminDashboard/Pages/AdminDashboard';
// import AdminLogin from './AdminDashboard/Pages/AdminLogin';
// import ProtectedRoute from './AdminDashboard/Components/ProtectedRoute';
// import FloatingContact from './Components/Common/FloatingContact';
// import ScrollToTop from './Components/Common/ScrollToTop';
// import ReadMoreDetails from './Components/Blogs/ReadMoreDetails';
// import CityProjects from './Components/Common/CityProjects';
// import PrivacyPolicy from './Components/Common/PrivacyPolicy';
// import TermsConditions from './Components/Common/TermsConditions';
// import DisclaimerModal from './Components/Common/Disclaimer';

// function AppWrapper() {
//   const footerRef = useRef(null);
//   const [showButton, setShowButton] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!footerRef.current) return;
//       const footerTop = footerRef.current.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;
//       setShowButton(footerTop <= windowHeight);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const isAdminPage = location.pathname.startsWith('/admin');

//   return (
//     <>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/completed-projects" element={<CompletedPrjcts />} />
//         <Route path="/upcoming-projects" element={<UpcomingPrjcts />} />
//         <Route path="/ongoing-projects" element={<OngoingPrjcts />} />
//         <Route path="/project/:projectId" element={<ProjectDetail />} />
//         <Route path="/events" element={<Event />} />
//         <Route path="/careers" element={<Career />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/read-more/:id" element={<ReadMoreDetails />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/city-projects" element={<CityProjects />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms-and-conditions" element={<TermsConditions />} />

//         {/* Admin Routes */}
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route
//           path="/admin/*"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {!isAdminPage && <Footer ref={footerRef} />}
//       {!isAdminPage && <FloatingContact />}

//       {!isAdminPage && showButton && (
//         <button
//           onClick={scrollToTop}
//           className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center z-50 hover:bg-white/40 transition"
//         >
//           <ChevronUp className="w-6 h-6 text-white" />
//         </button>
//       )}
//     </>
//   );
// }

// export default function App() {
//   const [loading, setLoading] = useState(true);
//   const [showDisclaimer, setShowDisclaimer] = useState(false);

//   //  Chatbot Script
//   useEffect(() => {
//     if (window.location.pathname.startsWith('/admin')) return;

//     const script = document.createElement('script');
//     script.src =
//       'https://backend.livhousing.com/bot/create-script-tag?token=e5e9e8e1-fd8d-4391-9be3-8f4ded52f315';
//     script.async = true;

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//       const agreed = sessionStorage.getItem('disclaimerAgreed');
//       if (!agreed) {
//         setShowDisclaimer(true);
//       }
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handleAgree = () => {
//     sessionStorage.setItem('disclaimerAgreed', 'true');
//     setShowDisclaimer(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <img
//           src={logo}
//           alt="Upkar Logo"
//           className="w-40 sm:w-52 md:w-64 object-contain animate-pulse"
//         />
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <ScrollToTop />
//       <ToastContainer />
//       {showDisclaimer && <DisclaimerModal onAgree={handleAgree} />}
//       <AppWrapper />
//     </Router>
//   );
// }

import React, { useEffect, useState, useRef } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { ChevronUp } from 'lucide-react';
import logo from './assets/logo.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './Components/Common/Footer';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import CompletedPrjcts from './Pages/CompletedPrjcts';
import UpcomingPrjcts from './Pages/UpcomingPrjcts';
import OngoingPrjcts from './Pages/OngoingPrjcts';
import ProjectDetail from './Pages/ProjectDetail';

import Event from './Pages/Event';
import Career from './Pages/Career';
import Blogs from './Pages/Blogs';
import Contact from './Pages/Contact';
import AdminDashboard from './AdminDashboard/Pages/AdminDashboard';
import AdminLogin from './AdminDashboard/Pages/AdminLogin';
import ProtectedRoute from './AdminDashboard/Components/ProtectedRoute';
import FloatingContact from './Components/Common/FloatingContact';
import ScrollToTop from './Components/Common/ScrollToTop';
import ReadMoreDetails from './Components/Blogs/ReadMoreDetails';
import CityProjects from './Components/Common/CityProjects';
import PrivacyPolicy from './Components/Common/PrivacyPolicy';
import TermsConditions from './Components/Common/TermsConditions';
import DisclaimerModal from './Components/Common/Disclaimer';

function AppWrapper() {
  const footerRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Scroll button logic
  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current) return;
      const footerTop = footerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      setShowButton(footerTop <= windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Disclaimer logic (ONLY for user pages)
  useEffect(() => {
    const agreed = sessionStorage.getItem('disclaimerAgreed');

    if (!agreed && !isAdminPage) {
      setShowDisclaimer(true);
    }
  }, [isAdminPage]);

  const handleAgree = () => {
    sessionStorage.setItem('disclaimerAgreed', 'true');
    setShowDisclaimer(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/completed-projects" element={<CompletedPrjcts />} />
        <Route path="/upcoming-projects" element={<UpcomingPrjcts />} />
        <Route path="/ongoing-projects" element={<OngoingPrjcts />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
        <Route path="/events" element={<Event />} />
        <Route path="/careers" element={<Career />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/read-more/:id" element={<ReadMoreDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/city-projects" element={<CityProjects />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Hide in Admin */}
      {!isAdminPage && <Footer ref={footerRef} />}
      {/* {!isAdminPage && <FloatingContact />} */}
      {!isAdminPage && !showButton && <FloatingContact />}

      {/* Scroll to top button */}
      {!isAdminPage && showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-16 right-6 w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-center z-50 hover:bg-white/40 transition"
        >
          <ChevronUp className="w-6 h-6 text-white" />
        </button>
      )}

      {/*  Disclaimer ONLY for user side */}
      {!isAdminPage && showDisclaimer && (
        <DisclaimerModal onAgree={handleAgree} />
      )}
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Chatbot Script (ONLY for user pages)
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) return;

    const script = document.createElement('script');
    script.src =
      'https://backend.livhousing.com/bot/create-script-tag?token=e5e9e8e1-fd8d-4391-9be3-8f4ded52f315';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <img
          src={logo}
          alt="Upkar Logo"
          className="w-40 sm:w-52 md:w-64 object-contain animate-pulse"
        />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer />
      <AppWrapper />
    </Router>
  );
}
