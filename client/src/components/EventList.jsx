import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import FilterEvents from './FilterEvents';

const EventList = () => {
    const [events, setEvents] = useState([]); // State to store all events
    const [filteredEvents, setFilteredEvents] = useState([]); // State to store filtered events
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track errors

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events/all'); // Replace with your API endpoint
                setEvents(response.data); // Set the fetched events in state
                setFilteredEvents(response.data); // Initialize filtered events
                setLoading(false); // Set loading to false
            } catch (err) {
                setError(err.message); // Set error message
                setLoading(false); // Set loading to false
            }
        };

        fetchEvents();
    }, []);

    // Handle sorting
    const handleSortChange = (sortType) => {
        const sortedEvents = [...filteredEvents].sort((a, b) => {
            const dateA = new Date(a.start_date);
            const dateB = new Date(b.start_date);
            return sortType === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setFilteredEvents(sortedEvents);
    };

    // Handle month filtering
    const handleMonthFilter = (month) => {
        if (!month) {
            setFilteredEvents(events); // Reset to all events
            return;
        }
        const filtered = events.filter((event) => {
            const eventMonth = new Date(event.start_date).toISOString().split('-')[1]; // Extract month
            return eventMonth === month;
        });
        setFilteredEvents(filtered);
    };

    // Handle time filtering (24-hour format)
    const handleTimeFilter = (time) => {
        if (!time) {
            setFilteredEvents(events); // Reset to all events
            return;
        }
        const filtered = events.filter((event) => {
            const eventHour = parseInt(event.start_time.split(':')[0], 10); // Extract hour from 24-hour time
            return time === 'morning'
                ? eventHour >= 6 && eventHour < 12 // Morning: 6:00 - 11:59
                : eventHour >= 12 && eventHour < 18; // Afternoon: 12:00 - 17:59
        });
        setFilteredEvents(filtered);
    };

    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            {/* Filter Component */}
            <FilterEvents
                onSortChange={handleSortChange}
                onMonthFilter={handleMonthFilter}
                onTimeFilter={handleTimeFilter}
            />

            {/* Event Cards */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                filteredEvents.map((event) => (
                    <EventCard key={event.event_id} event={event} loading={loading} />
                ))
            )}
        </div>
    );
};

export default EventList;