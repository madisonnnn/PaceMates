import { useState } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import EventList from '../components/EventList';
import QuoteDisplay from "../components/QuoteDisplay"
import FilterEvents from '../components/FilterEvents';

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleCreateEventClick = () => {
    setShowForm(!showForm);
  }

  return <>
    <section className='quote-space'>
      <section className="quotesection">
        <QuoteDisplay />
      </section>
    </section>
    <div>
      <h1>Events</h1>
      <button onClick={handleCreateEventClick}>
        {showForm ? 'Close Form' : 'Create Event'}
      </button>

      {showForm && <CreateEventForm />}
      <FilterEvents onFilter={setFilteredEvents} />
      <EventList filteredEvents={filteredEvents} />
    </div>
  </>
}
