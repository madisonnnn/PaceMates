import { useState } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import EventList from '../components/EventList';

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);

  const handleCreateEventClick = () => {
    setShowForm(!showForm);
  }

  return (
    <div>
      <h1>Events</h1>
      <button onClick={handleCreateEventClick}>
        {showForm ? 'Close Form' : 'Create Event'}
      </button>

      {showForm && <CreateEventForm />}
      <EventList />
    </div>
  );
}
