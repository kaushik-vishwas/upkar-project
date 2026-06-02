import ProjectsList from '../Components/UpcomingPrjcts/projectsList';
import OurValues from '../Components/CompletedPrjcts/OurValues';
import GetInTouch from '../Components/AboutUs/AboutGetInTouch';
import UpcomingMain from '../Components/UpcomingPrjcts/UpcomingMain';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const UpcomingPrjcts = () => {
  return (
    <div>
      <CmpltNavbar />
      <div className="pt-16 space-y-2">
        <UpcomingMain />
        <ProjectsList />
        <OurValues />
        <GetInTouch />
      </div>
    </div>
  );
};

export default UpcomingPrjcts;
