// import React, { useState } from 'react';
// import { Menu, X } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png';

// const NavbarHome = () => {
//   const [ongoingOpen, setOngoingOpen] = useState(false);
//   const [completedOpen, setCompletedOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   const staticLinks = [
//     { name: 'Events', path: '/events' },
//     { name: 'Blogs', path: '/blogs' },
//     { name: 'Careers', path: '/careers' },
//     { name: 'Contact Us', path: '/contact' },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md shadow-md p-4 flex items-center justify-between z-[1000]">
//       <div className="flex items-center">
//         <Link to="/">
//           <img
//             src={logo}
//             alt="Logo"
//             className="h-16 w-auto object-contain cursor-pointer"
//           />
//         </Link>
//       </div>
//       <ul className="hidden md:flex absolute font-figtree left-1/2 transform -translate-x-1/2 space-x-8 items-center">
//         <li>
//           <Link
//             to="/aboutus"
//             className="text-black hover:text-[#2D5C3A] transition-colors duration-300 whitespace-nowrap"
//           >
//             About us
//           </Link>
//         </li>

//         <li className="relative flex items-center space-x-1 cursor-pointer">
//           <div
//             onMouseEnter={() => {
//               setOngoingOpen(true);
//               if (window.ongoingTimeout) {
//                 clearTimeout(window.ongoingTimeout);
//                 window.ongoingTimeout = null;
//               }
//             }}
//             onMouseLeave={() => {
//               window.ongoingTimeout = setTimeout(() => {
//                 setOngoingOpen(false);
//               }, 2000);
//             }}
//             className="relative"
//           >
//             <Link
//               to="/ongoing-projects"
//               className="text-black hover:text-[#2D5C3A] transition-colors duration-300 flex items-center"
//             >
//               Ongoing
//             </Link>
//           </div>
//         </li>

//         <li>
//           <Link
//             to="/upcoming-projects"
//             className="text-black hover:text-[#2D5C3A] transition-colors duration-300"
//           >
//             Upcoming
//           </Link>
//         </li>

//         <li className="relative flex items-center space-x-1 cursor-pointer">
//           <div
//             onMouseEnter={() => {
//               setCompletedOpen(true);
//               if (window.completedTimeout) {
//                 clearTimeout(window.completedTimeout);
//                 window.completedTimeout = null;
//               }
//             }}
//             onMouseLeave={() => {
//               window.completedTimeout = setTimeout(() => {
//                 setCompletedOpen(false);
//               }, 2000);
//             }}
//             className="relative"
//           >
//             <Link
//               to="/completed-projects"
//               className="text-black hover:text-[#2D5C3A] transition-colors duration-300 flex items-center"
//             >
//               Completed
//             </Link>
//           </div>
//         </li>

//         {staticLinks.map((item) => (
//           <li key={item.name}>
//             <Link
//               to={item.path}
//               className="text-black hover:text-[#2D5C3A] transition-colors duration-300 whitespace-nowrap"
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <button
//         className="md:hidden text-gray-700 focus:outline-none"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
//       </button>

//       {menuOpen && (
//         <div className="absolute top-full left-0 w-full font-figtree bg-white shadow-md rounded-md mt-0 z-50 md:hidden">
//           <ul className="flex flex-col space-y-2 p-4">
//             <li>
//               <Link
//                 to="/aboutus"
//                 className="block  text-black hover:text-[#2D5C3A] transition-colors"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 About us
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/ongoing-projects"
//                 className="block text-black hover:text-[#2D5C3A] transition-colors"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Ongoing
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/upcoming-projects"
//                 className="block text-black hover:text-[#2D5C3A] transition-colors"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Upcoming
//               </Link>
//             </li>

//             <li>
//               <div>
//                 <div className="flex items-center justify-between">
//                   <Link
//                     to="/completed-projects"
//                     className="flex-1 text-black hover:text-[#2D5C3A]"
//                     onClick={() => setMenuOpen(false)}
//                   >
//                     Completed
//                   </Link>
//                 </div>
//               </div>
//             </li>

//             {staticLinks.map((item) => (
//               <li key={item.name}>
//                 <Link
//                   to={item.path}
//                   className="block text-black hover:text-[#2D5C3A] transition-colors"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavbarHome;
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';

const NavbarHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'About Us', path: '/aboutus' },
    { name: 'Ongoing', path: '/ongoing-projects' },
    { name: 'Upcoming', path: '/upcoming-projects' },
    { name: 'Completed', path: '/completed-projects' },
    { name: 'Events', path: '/events' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600&display=swap');

        .navbar-figtree { font-family: 'Figtree', sans-serif; }

        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .contact-btn {
          background: linear-gradient(
            120deg,
            #2D5C3A 0%, #3a7049 35%, #9eaaa2 50%, #3a7049 65%, #2D5C3A 100%
          );
          background-size: 250% 250%;
          animation: shimmer 5s ease infinite;
          color: #fff;
          font-family: 'Figtree', sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          border-radius: 0.5rem;
          padding: 0.45rem 1.25rem;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 2px 10px rgba(45,92,58,0.22);
          white-space: nowrap;
        }
        .contact-btn:hover {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 5px 18px rgba(45,92,58,0.32);
        }
        .contact-btn:active { transform: scale(0.98); }

        .contact-btn-mobile {
          background: linear-gradient(
            120deg,
            #2D5C3A 0%, #3a7049 35%, #9eaaa2 50%, #3a7049 65%, #2D5C3A 100%
          );
          background-size: 250% 250%;
          animation: shimmer 5s ease infinite;
          color: #fff;
          font-family: 'Figtree', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          border-radius: 0.5rem;
          padding: 0.55rem 1.2rem;
          text-align: center;
          display: block;
          width: 100%;
          box-shadow: 0 2px 8px rgba(45,92,58,0.18);
        }

        /* Desktop nav links — active/hover green */
        .nav-link {
          position: relative;
          color: #000;
          font-family: 'Figtree', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          white-space: nowrap;
          transition: color 0.25s ease;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1.5px;
          background: #2D5C3A;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #2D5C3A; }
        .nav-link:hover::after,
        .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #2D5C3A; font-weight: 500; }

        /* Mobile drawer */
        .mobile-drawer {
          transform: translateY(-6px);
          opacity: 0;
          pointer-events: none;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .mobile-drawer.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        /* Mobile links — always black, NO active green */
        .mobile-nav-link {
          display: block;
          padding: 0.6rem 0;
          border-bottom: 1px solid #f0f0f0;
          color: #1a1a1a !important;
          font-family: 'Figtree', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          transition: padding-left 0.2s ease;
        }
        .mobile-nav-link:hover {
          padding-left: 5px;
          color: #2D5C3A !important;
        }
      `}</style>

      <nav className="navbar-figtree fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md shadow-md p-4 flex items-center justify-between z-[1000]">
        {/* LEFT — Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto object-contain cursor-pointer"
          />
        </Link>

        {/* CENTER — Desktop nav links */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT — Contact Us + Hamburger */}
        <div className="flex items-center gap-3">
          <Link to="/contact" className="hidden md:block">
            <button className="contact-btn">Contact Us</button>
          </Link>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <div
        className={`mobile-drawer navbar-figtree md:hidden fixed top-[88px] left-0 w-full bg-white shadow-md px-5 pb-5 pt-2 z-[999] ${menuOpen ? 'open' : ''}`}
      >
        <ul className="flex flex-col">
          {navLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="mobile-nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              <span className="contact-btn-mobile">Contact Us</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarHome;
