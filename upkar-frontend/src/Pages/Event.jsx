import Eventmain from '../Components/Events/EventMain';
import Events from '../Components/Events/Events';
import EventGetIn from '../Components/Events/EventGetIn';
import CmpltNavbar from '../Components/CompletedPrjcts/CmpltNavbar';

const Event = () => {
  return (
    <div>
      <CmpltNavbar />
      <div className="pt-24">
        <Eventmain />
        <Events />
        <EventGetIn />
      </div>
    </div>
  );
};

export default Event;
