import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import BannerTable from '../Components/HomePage/Banner';
import VisionMission from '../Components/HomePage/VisionMission';
import Projects from '../Components/HomePage/Projects';
import Certification from '../Components/AboutPage/CoreValues.jsx';
import BrandEthos from '../Components/AboutPage/BrandEthos.jsx';
import AwardRecognition from '../Components/AboutPage/AwardRecognition.jsx';
import BrandMotive from '../Components/HomePage/BrandMotive.jsx';
import QAs from '../Components/HomePage/QAs';
import Awards from '../Components/HomePage/Awards';
import QuoteCertificate from '../Components/HomePage/Quote';
import TreeSection from '../Components/HomePage/Tree';
import Testimonial from '../Components/HomePage/Testimonial.jsx';
import ProjectMain from '../Components/ProjectPage/ProjectMain';
import Feature from '../Components/ProjectPage/Feature';
import Amenity from '../Components/ProjectPage/Amenity';
import PlotLayout from '../Components/ProjectPage/PlotLayout';
import ProjectImages from '../Components/ProjectPage/ProjectImages';
import AboutProject from '../Components/ProjectPage/AboutProject';
import AboutMain from '../Components/AboutPage/AboutMain';
import Quote from '../Components/AboutPage/Quote';
import Team from '../Components/AboutPage/Team';
import AboutImages from '../Components/AboutPage/AboutImages';
import EventMain from '../Components/EventPage/EventMain';
import EventTop from '../Components/EventPage/EventTop';
import CareerMain from '../Components/CareerPage/CareerMain';
import WhyJoinMain from '../Components/CareerPage/WhyJoinMain';
import CareerImages from '../Components/CareerPage/CareerImages';
import CompletedMain from '../Components/CompletedPrjctPage/CompletedMain';
import OurValues1 from '../Components/CompletedPrjctPage/OurValues';
import ProjectLists1 from '../Components/CompletedPrjctPage/ProjectLists';
import ValueImages from '../Components/CompletedPrjctPage/ValueImages';
import UpcomingMain from '../Components/UpcomingPrjctPage/UpcomingMain';
import ProjectLists2 from '../Components/UpcomingPrjctPage/ProjectLists';
import OurValues2 from '../Components/UpcomingPrjctPage/OurValues';
import OngoingMain from '../Components/OngoingPrjctPage/OngoingMain';
import ProjectLists from '../Components/OngoingPrjctPage/ProjectLists';
import OurValues from '../Components/OngoingPrjctPage/OurValues';
import BlogMain from '../Components/BlogPage/BlogMain';
import PopularArticles from '../Components/BlogPage/PopularArticles';
import Readmore from '../Components/BlogPage/Readmore';
import ContactMain from '../Components/ContactPage/ContactMain';
import Locations from '../Components/ContactPage/LocationsMain.jsx';
import EnquiryList from '../Components/Enquiries/EnquiryList';
import Dashboard from '../Components/Dashboard/Dashboard';
import Project from '../Components/Projects/ProjectsList';
import Categories from '../Components/Categories/Categories';
import CategoryDetails from '../Components/Categories/categoryDetails';
import MediaLibrary from '../Components/MediaLibrary/MediaLibrary';
import CareerEnquiryList from '../Components/Enquiries/CareerEnquiry';
import EventEnquiryList from '../Components/Enquiries/EventEnquiryList';
import ContactEnquiryList from '../Components/Enquiries/ContactEnquiry.jsx';
import CareerRoles from '../Components/JobRoles/JobRoles';
import Settings from '../Components/Settings/Settings';
import AwardRecognitionAdmin from '../Components/AboutPage/AwardRecognition.jsx';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <div className="fixed top-0 left-0 sm:left-64 right-0 h-16 z-10">
          <Navbar />
        </div>
        <div className="sm:ml-64 mt-16 p-6">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="banner" element={<BannerTable />} />
            <Route path="vision" element={<VisionMission />} />
            <Route path="home-projects" element={<Projects />} />
            <Route path="certification" element={<Certification />} />
            <Route path="Brandethos" element={<BrandEthos />} />
            <Route path="award-recognition" element={<AwardRecognition />} />
            <Route path="Brandmotive" element={<BrandMotive />} />
            <Route path="qna" element={<QAs />} />
            <Route path="awards" element={<Awards />} />
            <Route path="quotes" element={<QuoteCertificate />} />
            <Route path="tree" element={<TreeSection />} />
            <Route path="testimonials" element={<Testimonial />} />
            <Route path="project-main" element={<ProjectMain />} />
            <Route path="feature" element={<Feature />} />
            <Route path="amenity" element={<Amenity />} />
            <Route path="plot-layout" element={<PlotLayout />} />
            <Route path="project-images" element={<ProjectImages />} />
            <Route path="about-project" element={<AboutProject />} />
            <Route path="about-main" element={<AboutMain />} />
            <Route path="quote" element={<Quote />} />
            <Route path="team" element={<Team />} />
            <Route path="about-images" element={<AboutImages />} />
            <Route path="event-top" element={<EventTop />} />
            <Route path="events" element={<EventMain />} />
            <Route path="career-main" element={<CareerMain />} />
            <Route path="why-join" element={<WhyJoinMain />} />
            <Route path="career-images" element={<CareerImages />} />
            <Route path="completed-main" element={<CompletedMain />} />
            <Route path="completed-values" element={<OurValues1 />} />
            <Route path="completed-projects" element={<ProjectLists1 />} />
            <Route path="value-images" element={<ValueImages />} />
            <Route path="upcoming-main" element={<UpcomingMain />} />
            <Route path="upcoming-projects" element={<ProjectLists2 />} />
            <Route path="upcoming-values" element={<OurValues2 />} />
            <Route path="ongoing-main" element={<OngoingMain />} />
            <Route path="ongoing-projects" element={<ProjectLists />} />
            <Route path="ongoing-values" element={<OurValues />} />
            <Route path="blogs" element={<BlogMain />} />
            <Route path="popular-articles" element={<PopularArticles />} />
            <Route path="read-more" element={<Readmore />} />
            <Route path="contact" element={<ContactMain />} />
            <Route path="locations" element={<Locations />} />
            <Route path="enquiries" element={<EnquiryList />} />
            <Route path="projects-list" element={<Project />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:id" element={<CategoryDetails />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="career-enquiries" element={<CareerEnquiryList />} />
            <Route path="event-enquiries" element={<EventEnquiryList />} />
            <Route path="contact-enquiries" element={<ContactEnquiryList />} />
            <Route path="career-roles" element={<CareerRoles />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
