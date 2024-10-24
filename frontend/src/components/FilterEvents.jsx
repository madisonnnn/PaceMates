import { useState } from 'react';
import { getFilteredEvents } from '../adapters/event-adapter';

export default function FilterEvents ({ onFilterChange }) {
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState(5); 
  const [maxSize, setMaxSize] = useState(10); 
  const [filteredEvents, setFilteredEvents] = useState([])
  const [error, setError] = useState(null);

  const handleApplyFilters = async () => {
    onFilterChange({ location, distance, maxSize });
    try {
      const events = await getFilteredEvents({ location, distance, maxSize });
      setFilteredEvents(events)
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load filtered events.");
    }
  };

  return (
    <div className="filter-component">
      <h2>Filter Events</h2>
      <div className="filter-item">
        <label>Location:</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select a borough</option>
          <option value="manhattan">Manhattan</option>
          <option value="brooklyn">Brooklyn</option>
          <option value="queens">Queens</option>
          <option value="bronx">Bronx</option>
          <option value="staten-island">Staten Island</option>
        </select>
      </div>
      <div className="filter-item">
        <label>Distance:</label>
        <input
          type="range"
          min="1"
          max="15"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <span>{distance} miles</span>
      </div>
      <div className="filter-item">
        <label>Max Participants:</label>
        <select value={maxSize} onChange={(e) => setMaxSize(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
        </select>
      </div>
      {/* connect button click to fetch from backend */}
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

