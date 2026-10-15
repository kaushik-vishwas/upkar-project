import ProjectsList from '../Components/OngoingPrjcts/projectsList';
import OurValues from '../Components/CompletedPrjcts/OurValues';
import GetInTouch from '../Components/AboutUs/AboutGetInTouch';
import OngoingMain from '../Components/OngoingPrjcts/OngoingMain';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const OngoingPrjcts = () => {
  return (
    <div>
      <CmpltNavbar />
      <div className="pt-16 space-y-2">
        <OngoingMain />
        <ProjectsList />
        <OurValues />
        <GetInTouch />
      </div>
    </div>
  );
};

export default OngoingPrjcts;
