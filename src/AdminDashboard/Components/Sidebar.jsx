import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Info,
  Folder,
  Calendar,
  Briefcase,
  CheckCircle,
  Activity,
  FileText,
  ChevronDown,
  Menu,
  Settings,
  X,
  LogOut,
  ClipboardList,
  LayoutGrid,
  Building2,
  BarChart3,
  ImageIcon,
  UserCheck,
} from 'lucide-react';
import logo from '../../assets/Icons/adminLogo.png';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const activeClass = 'bg-[#2D5C3A] text-white';
const normalClass =
  'flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-[#2D5C3A] hover:text-white';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [openHome, setOpenHome] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openCareer, setOpenCareer] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [openUpcoming, setOpenUpcoming] = useState(false);
  const [openOngoing, setOpenOngoing] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#2D5C3A',
      confirmButtonText: 'Yes, Logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login', { replace: true });
        toast.success('Logged out successfully!');
      }
    });
  };

  const linkClass = ({ isActive }) =>
    `${normalClass} ${isActive ? activeClass : ''}`;

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-[9999]">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-white p-2 rounded shadow"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-[9000] transform transition-transform duration-300 flex flex-col
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0`}
      >
        <div className="flex items-center gap-3 p-4 border-b h-[72px] flex-shrink-0">
          <img src={logo} alt="logo" className="h-10" />
          <h2 className="text-xl font-bold">Upkar Admin</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <BarChart3 size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/categories" className={linkClass}>
            <LayoutGrid size={18} />
            Categories
          </NavLink>

          <NavLink to="/admin/projects-list" className={linkClass}>
            <Building2 size={18} />
            Projects
          </NavLink>

          <NavLink to="/admin/enquiries" className={linkClass}>
            <ClipboardList size={18} />
            Project Enquiries
          </NavLink>

          <NavLink to="/admin/career-enquiries" className={linkClass}>
            <UserCheck size={18} />
            Career Enquiries
          </NavLink>

          <NavLink to="/admin/event-enquiries" className={linkClass}>
            <ClipboardList size={18} />
            Event Enquiries
          </NavLink>

          <NavLink to="/admin/contact-enquiries" className={linkClass}>
            <ClipboardList size={18} />
            Contact Enquiries
          </NavLink>

          <NavLink to="/admin/career-roles" className={linkClass}>
            <UserCheck size={18} />
            Jobs Roles
          </NavLink>
          {/* 
          <NavLink to="/admin/media" className={linkClass}>
            <ImageIcon size={18} />
            Media Library
          </NavLink> */}

          <button
            onClick={() => setOpenHome(!openHome)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Home size={18} /> Home Page
            </span>
            <ChevronDown className={openHome ? 'rotate-180' : ''} />
          </button>

          {openHome && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/banner" className={linkClass}>
                Banner
              </NavLink>
              <NavLink to="/admin/vision" className={linkClass}>
                Vision & Mission
              </NavLink>
              <NavLink to="/admin/home-projects" className={linkClass}>
                Projects
              </NavLink>

              {/* <NavLink to="/admin/Brandmotive" className={linkClass}>
                Brand Motive
              </NavLink> */}
              <NavLink to="/admin/quotes" className={linkClass}>
                Quotes
              </NavLink>
              <NavLink to="/admin/qna" className={linkClass}>
                Q & A
              </NavLink>
              <NavLink to="/admin/awards" className={linkClass}>
                Awards
              </NavLink>
              <NavLink to="/admin/tree" className={linkClass}>
                Tree
              </NavLink>
              <NavLink to="/admin/testimonials" className={linkClass}>
                Testimonials
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenAbout(!openAbout)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Info size={18} /> About Page
            </span>
            <ChevronDown className={openAbout ? 'rotate-180' : ''} />
          </button>

          {openAbout && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/about-main" className={linkClass}>
                About Main
              </NavLink>
              <NavLink to="/admin/quote" className={linkClass}>
                Quote
              </NavLink>
              <NavLink to="/admin/team" className={linkClass}>
                Team
              </NavLink>
              <NavLink to="/admin/about-images" className={linkClass}>
                About Images
              </NavLink>
              <NavLink to="/admin/certification" className={linkClass}>
                Core Values
              </NavLink>
              <NavLink to="/admin/Brandethos" className={linkClass}>
                Brand Ethos
              </NavLink>
              <NavLink to="/admin/award-recognition" className={linkClass}>
                Award Recognition
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenCompleted(!openCompleted)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <CheckCircle size={18} /> Completed
            </span>
            <ChevronDown className={openCompleted ? 'rotate-180' : ''} />
          </button>

          {openCompleted && (
            <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
              <NavLink to="/admin/completed-main" className={linkClass}>
                Completed Main
              </NavLink>
              <NavLink to="/admin/completed-values" className={linkClass}>
                Our Values
              </NavLink>

              <NavLink to="/admin/value-images" className={linkClass}>
                Value images
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenUpcoming(!openUpcoming)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Calendar size={18} /> Upcoming
            </span>
            <ChevronDown className={openUpcoming ? 'rotate-180' : ''} />
          </button>

          {openUpcoming && (
            <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
              <NavLink to="/admin/upcoming-main" className={linkClass}>
                Upcoming Main
              </NavLink>
              <NavLink to="/admin/upcoming-values" className={linkClass}>
                Our Values
              </NavLink>

              <NavLink to="/admin/value-images" className={linkClass}>
                Value images
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenOngoing(!openOngoing)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Activity size={18} /> Ongoing
            </span>
            <ChevronDown className={openOngoing ? 'rotate-180' : ''} />
          </button>

          {openOngoing && (
            <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
              <NavLink to="/admin/ongoing-main" className={linkClass}>
                Ongoing Main
              </NavLink>
              <NavLink to="/admin/ongoing-values" className={linkClass}>
                Our Values
              </NavLink>

              <NavLink to="/admin/value-images" className={linkClass}>
                Value images
              </NavLink>
            </div>
          )}

          {/* <button
            onClick={() => setOpenProject(!openProject)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Folder size={18} /> Project Page
            </span>
            <ChevronDown className={openProject ? 'rotate-180' : ''} />
          </button> */}

          {/* {openProject && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/project-main" className={linkClass}>
                Project Main
              </NavLink>
              <NavLink to="/admin/feature" className={linkClass}>
                Feature
              </NavLink>
              <NavLink to="/admin/plot-layout" className={linkClass}>
                Plot Layout
              </NavLink>
              <NavLink to="/admin/amenity" className={linkClass}>
                Amenities
              </NavLink>
              <NavLink to="/admin/about-project" className={linkClass}>
                About Project
              </NavLink>
              <NavLink to="/admin/project-images" className={linkClass}>
                Project Images
              </NavLink>
            </div>
          )} */}

          <button
            onClick={() => setOpenEvent(!openEvent)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Calendar size={18} /> Event Page
            </span>
            <ChevronDown className={openEvent ? 'rotate-180' : ''} />
          </button>

          {openEvent && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/event-top" className={linkClass}>
                Event Main
              </NavLink>
              <NavLink to="/admin/events" className={linkClass}>
                Events
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenCareer(!openCareer)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <Briefcase size={18} /> Career Page
            </span>
            <ChevronDown className={openCareer ? 'rotate-180' : ''} />
          </button>

          {openCareer && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/career-main" className={linkClass}>
                Career Main
              </NavLink>
              <NavLink to="/admin/why-join" className={linkClass}>
                Why Join
              </NavLink>
              <NavLink to="/admin/career-images" className={linkClass}>
                Career Images
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenBlog(!openBlog)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <FileText size={18} /> Blogs Page
            </span>
            <ChevronDown className={openBlog ? 'rotate-180' : ''} />
          </button>

          {openBlog && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/blogs" className={linkClass}>
                Blogs Main
              </NavLink>
              <NavLink to="/admin/popular-articles" className={linkClass}>
                Popular Articles
              </NavLink>
              <NavLink to="/admin/read-more" className={linkClass}>
                Read More
              </NavLink>
            </div>
          )}

          <button
            onClick={() => setOpenContact(!openContact)}
            className="w-full p-2 border rounded flex justify-between"
          >
            <span className="flex gap-2">
              <FileText size={18} /> Contact Page
            </span>
            <ChevronDown className={openContact ? 'rotate-180' : ''} />
          </button>

          {openContact && (
            <div className="ml-4 space-y-1 text-sm">
              <NavLink to="/admin/contact" className={linkClass}>
                Contact Main
              </NavLink>
              <NavLink to="/admin/locations" className={linkClass}>
                Locations
              </NavLink>
            </div>
          )}

          <NavLink to="/admin/settings" className={linkClass}>
            <Settings size={18} />
            Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full mt-4 p-2 border text-red-600 hover:bg-red-600 hover:text-white rounded"
          >
            <LogOut className="inline mr-2" />
            Logout
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[1000] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
