import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]); // All events
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch events from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events/all'); // Replace with your API endpoint
                const sortedEvents = response.data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)); // Sort events from newest to oldest
                setEvents(sortedEvents);
                setFilteredEvents(sortedEvents);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
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
        const sortedFiltered = filtered.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)); // Sort filtered events
        setFilteredEvents(sortedFiltered);
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
        const sortedFiltered = filtered.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)); // Sort filtered events
        setFilteredEvents(sortedFiltered);
    };

    return (
        <EventContext.Provider
            value={{
                events,
                filteredEvents,
                loading,
                error,
                handleSortChange,
                handleMonthFilter,
                handleTimeFilter,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

// Custom hook to use the EventContext
export const useEventContext = () => useContext(EventContext);