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
// import '../styles/EventPageStyles.css'

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

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
          <FilterEvents onFilter={setFilteredEvents}/>
          <EventList  filteredEvents={filteredEvents} />
        </div>
      </div>
    </>
  );
  // MAdison's incoming changes
  // return <div className="eventpage">
  //    <h1>Events</h1>
  //    <div className='event-page-items'>
  //     <div className='side-items'>
  //       <EventList filteredEvents={filteredEvents} />  
  //     </div>
  //       <div className='side-items' id='side'> 
  //         <button class='button' onClick={handleCreateEventClick}>
  //           {showForm ? 'Close Form' : 'Create Event'}
  //         </button>

  //           {showForm && <CreateEventForm />}
  //           <FilterEvents onFilter={setFilteredEvents} />
  //     <section className='quote-space'>
  //     <section className="quotesection">
  //       <QuoteDisplay />
  //     </section>
  //   </section>  
  //     </div>
      
  //   </div>
  // </div>
}

