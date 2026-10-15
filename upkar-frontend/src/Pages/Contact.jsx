import ContactMain from '../Components/Contact/ContactMain';
import Location from '../Components/Contact/Locations';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const Blogs = () => {
  return (
    <>
      <CmpltNavbar />
      <div className="pt-24">
        <ContactMain />
        <Location />
      </div>
    </>
  );
};

export default Blogs;
