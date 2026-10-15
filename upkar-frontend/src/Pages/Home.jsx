import HomeMain from '../Components/HomePage/HomeMain';
import VisionMission from '../Components/HomePage/VisionMission';
import Projects from '../Components/HomePage/Projects';
import Navbar from '../Components/CompletedPrjcts/CmpltNavbar';
import TreeSection from '../Components/HomePage/TreeSection';
import Map from '../Components/HomePage/Map';
import Testimonials from '../Components/HomePage/Testimonials';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <HomeMain />
        <div className="pt-6 lg:pt-12"></div>
        <TreeSection />
        <VisionMission />
        <Map />
        <div className="pt-6 lg:pt-6"></div>
        <Projects />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
