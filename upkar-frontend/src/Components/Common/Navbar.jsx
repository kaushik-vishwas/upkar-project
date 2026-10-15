import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const location = useLocation();

  const [ongoingOpen, setOngoingOpen] = useState(false);
  const [completedOpen, setCompletedOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  return (
    // <nav className="bg-white shadow-md py-4 px-4 lg:px-10 flex items-center justify-between relative font-figtree">
    <nav className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md shadow-md py-4 px-4 lg:px-10 flex items-center justify-between z-50 font-figtree">
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto object-contain cursor-pointer"
          />
        </Link>
      </div>

      <ul className="hidden lg-nav:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 items-center">
        <li>
          {/* <Link
            to="/aboutus"
            className="text-black hover:text-[#2D5C3A]  transition-colors duration-300 whitespace-nowrap"
          >
            About us
          </Link> */}
          <Link
            to="/aboutus"
            className={`transition-colors duration-300 whitespace-nowrap ${
              isActive('/aboutus')
                ? 'text-[#2D5C3A] font-medium'
                : 'text-black hover:text-[#2D5C3A]'
            }`}
          >
            About us
          </Link>
        </li>

        <li className="relative flex items-center space-x-1 cursor-pointer">
          <div
            onMouseEnter={() => {
              setOngoingOpen(true);
              if (window.ongoingTimeout) {
                clearTimeout(window.ongoingTimeout);
                window.ongoingTimeout = null;
              }
            }}
            onMouseLeave={() => {
              window.ongoingTimeout = setTimeout(() => {
                setOngoingOpen(false);
              }, 2000);
            }}
            className="relative"
          >
            <Link
              to="/ongoing-projects"
              className={`transition-colors duration-300 flex items-center ${
                isActive('/ongoing-projects')
                  ? 'text-[#2D5C3A] font-medium'
                  : 'text-black hover:text-[#2D5C3A]'
              }`}
            >
              Ongoing
            </Link>
          </div>
        </li>

        <li>
          <Link
            to="/upcoming-projects"
            className={`transition-colors duration-300 ${
              isActive('/upcoming-projects')
                ? 'text-[#2D5C3A] font-medium'
                : 'text-black hover:text-[#2D5C3A]'
            }`}
          >
            Upcoming
          </Link>
        </li>

        <li className="relative flex items-center space-x-1 cursor-pointer group">
          <div
            onMouseEnter={() => {
              setCompletedOpen(true);
              if (window.completedTimeout) {
                clearTimeout(window.completedTimeout);
                window.completedTimeout = null;
              }
            }}
            onMouseLeave={() => {
              window.completedTimeout = setTimeout(() => {
                setCompletedOpen(false);
              }, 2000);
            }}
            className="relative"
          >
            <Link
              to="/completed-projects"
              className={`transition-colors duration-300 flex items-center ${
                isActive('/completed-projects')
                  ? 'text-[#2D5C3A] font-medium'
                  : 'text-black hover:text-[#2D5C3A]'
              }`}
            >
              Completed
            </Link>
          </div>
        </li>

        <li>
          <Link
            to="/events"
            className={`transition-colors duration-300 flex items-center ${
              isActive('/events')
                ? 'text-[#2D5C3A] font-medium'
                : 'text-black hover:text-[#2D5C3A]'
            }`}
          >
            Events
          </Link>
        </li>

        <li>
          <Link
            to="/blogs"
            className={`transition-colors duration-300 flex items-center ${
              isActive('/blogs')
                ? 'text-[#2D5C3A] font-medium'
                : 'text-black hover:text-[#2D5C3A]'
            }`}
          >
            Blogs
          </Link>
        </li>

        <li>
          <Link
            to="/careers"
            className={`transition-colors duration-300 ${
              isActive('/careers')
                ? 'text-[#2D5C3A] font-medium'
                : 'text-black hover:text-[#2D5C3A]'
            }`}
          >
            Careers
          </Link>
        </li>

        {location.pathname === '/aboutus' && (
          <li>
            <Link
              to="/contact"
              className={`transition-colors duration-300 whitespace-nowrap ${
                isActive('/contact')
                  ? 'text-[#2D5C3A] font-medium'
                  : 'text-black hover:text-[#2D5C3A]'
              }`}
            >
              Contact Us
            </Link>
          </li>
        )}
      </ul>

      {/* <div className="hidden lg-nav:flex flex-row items-center gap-3">
        {location.pathname === '/aboutus' && (
          <img
            src={navbarLast}
            alt="About Logo"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        )}
        {location.pathname === '/' && (
          <img
            src={navbarLast1}
            alt="Home Logo"
            className="h-16 w-auto object-contain cursor-pointer"
          />
        )}
      </div> */}

      <button
        className="lg-nav:hidden text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-2 z-50 lg-nav:hidden">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                to="/aboutus"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                to="/upcoming-projects"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
              >
                Upcoming
              </Link>
            </li>

            <li>
              <Link
                to="/ongoing-projects"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
              >
                Ongoing
              </Link>
            </li>
            <li className="relative flex items-center space-x-1 cursor-pointer group">
              <div
                onMouseEnter={() => {
                  setCompletedOpen(true);
                  if (window.completedTimeout) {
                    clearTimeout(window.completedTimeout);
                    window.completedTimeout = null;
                  }
                }}
                onMouseLeave={() => {
                  window.completedTimeout = setTimeout(() => {
                    setCompletedOpen(false);
                  }, 2000);
                }}
                className="relative"
              >
                <Link
                  to="/completed-projects"
                  className="text-black hover:text-[#2D5C3A]  transition-colors duration-300 flex items-center"
                >
                  Completed
                </Link>
              </div>
            </li>

            <li>
              <Link
                to="/events"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
              >
                Events
              </Link>
            </li>

            <li>
              <Link
                to="/blogs"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                to="/careers"
                className="block text-black hover:text-[#2D5C3A]  transition-colors"
              >
                Careers
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="block text-white bg-black text-center py-2 px-4 rounded-lg hover:bg-gray-900 transition-all duration-300 whitespace-nowrap"
                onClick={() => setMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
