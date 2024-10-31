// import { useState } from 'react';
// import CreateEventForm from '../components/CreateEventForm';
// import EventList from '../components/EventList';
// import QuoteDisplay from "../components/QuoteDisplay"
// import FilterEvents from '../components/FilterEvents';
// import "../styles/EventsPage.css"

// export default function EventsPage() {
//   const [showForm, setShowForm] = useState(false);

//   const handleCreateEventClick = () => {
//     setShowForm(!showForm);
//   }

//   return <>
//     <section>
//       <section>
//         <QuoteDisplay />
//       </section>
//     </section>

//     <div>
//       <button className="button" onClick={handleCreateEventClick}>
//         {showForm ? 'Close Form' : 'Create Event'}
//       </button>

//       {showForm && <CreateEventForm />}
//       <FilterEvents />
//       <EventList />
//     </div>
//   </>
// }

import { useState } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import EventList from '../components/EventList';
import QuoteDisplay from "../components/QuoteDisplay"
import FilterEvents from '../components/FilterEvents';
import "../styles/EventsPage.css"

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);

  const handleCreateEventClick = () => {
    setShowForm(!showForm);
  }

  return (
    <>
      <section>
        <section>
          <QuoteDisplay />
        </section>
      </section>

      <div>
        <button className="button" onClick={handleCreateEventClick}>
          {showForm ? 'Close Form' : 'Create Event'}
        </button>

        {showForm && <CreateEventForm />}

        <div className="events-page"> 
          <FilterEvents />
          <EventList />
        </div>
      </div>
    </>
  );
}

