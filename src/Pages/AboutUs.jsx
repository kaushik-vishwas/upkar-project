import MainSection from '../Components/AboutUs/MainSection';
import QnsAns from '../Components/Common/QnsAns';
import Quote from '../Components/AboutUs/Quote';
import Team from '../Components/AboutUs/Team';
import AboutCertification from '../Components/AboutUs/HomeBrandSections';
import Navbar from '../Components/CompletedPrjcts/CmpltNavbar';

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="pt-24">
        <MainSection />
        <Quote />
        <Team />
        <AboutCertification />
        <QnsAns />
      </div>
    </>
  );
};

export default AboutUs;
