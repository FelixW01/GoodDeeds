import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';

const EventList = () => {
    const [events, setEvents] = useState([]); // State to store events
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events/all'); // Replace with your API endpoint
                setEvents(response.data); // Set the fetched events in state
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchEvents();
    }, []);

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div className="flex flex-col items-center gap-4 ">
            {events.map((event) => (
                <EventCard key={event.event_id} event={event} loading={loading}/> // Use event_id as the key
            ))}
        </div>
    );
};

export default EventList;