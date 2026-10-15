import CompletedMain from '../Components/CompletedPrjcts/CompletedMain';
import ProjectsList from '../Components/CompletedPrjcts/ProjectsList';
import OurValues from '../Components/CompletedPrjcts/OurValues';
import GetInTouch from '../Components/AboutUs/AboutGetInTouch';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const CompletedPrjcts = () => {
  return (
    <div>
      <CmpltNavbar />
      <div className="pt-16 space-y-2">
        <CompletedMain />
        <ProjectsList />
        <OurValues />
        <GetInTouch />
      </div>
    </div>
  );
};

export default CompletedPrjcts;
