import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from './userContext.jsx';
import axios from 'axios';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]); // All events
    const [filteredEvents, setFilteredEvents] = useState([]); // Filtered events
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const { user } = useContext(UserContext); // Get the current user from UserContext

    // State to track active filters
    const [activeFilters, setActiveFilters] = useState({
        month: null,
        time: null,
        isActive: null,
        isRegistered: null,
    });

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

    // Function to check if the user is registered for an event
    const checkUserRegistration = async (eventId) => {
        if (!user) return false; // If no user is logged in, return false

        try {
            const response = await axios.get('/api/user-events/check-registration', {
                params: { event_id: eventId }, // Pass the event ID
            });
            return response.data.isRegistered; // Return true if the user is registered
        } catch (error) {
            console.error('Error checking registration:', error);
            return false; // Return false if there's an error
        }
    };

    // Function to apply all active filters
    const applyFilters = async () => {
        let filtered = [...events]; // Start with all events

        // Apply month filter
        if (activeFilters.month) {
            filtered = filtered.filter((event) => {
                const eventMonth = new Date(event.start_date).toISOString().split('-')[1]; // Extract month
                return eventMonth === activeFilters.month;
            });
        }

        // Apply time filter
        if (activeFilters.time) {
            filtered = filtered.filter((event) => {
                const eventHour = parseInt(event.start_time.split(':')[0], 10); // Extract hour from 24-hour time
                return activeFilters.time === 'morning'
                    ? eventHour >= 6 && eventHour < 12 // Morning: 6:00 - 11:59
                    : eventHour >= 12 && eventHour < 18; // Afternoon: 12:00 - 17:59
            });
        }

        // Apply active/inactive filter
        if (activeFilters.isActive !== null) {
            filtered = filtered.filter((event) => {
                const eventStartDate = new Date(event.start_date);
                const isEventActive = eventStartDate >= new Date() && event.status.toLowerCase() === 'active';
                return activeFilters.isActive ? isEventActive : !isEventActive;
            });
        }

        // Apply registered/not registered filter
        if (activeFilters.isRegistered !== null && user) {
            const registeredEvents = [];
            for (const event of filtered) {
                const isUserRegistered = await checkUserRegistration(event.event_id); // Check if the user is registered for the event
                if (activeFilters.isRegistered ? isUserRegistered : !isUserRegistered) {
                    registeredEvents.push(event);
                }
            }
            filtered = registeredEvents;
        }

        setFilteredEvents(filtered);
    };

    // Update active filters and reapply all filters
    const updateFilters = (filterType, value) => {
        setActiveFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    // Reapply filters whenever activeFilters or user changes
    useEffect(() => {
        applyFilters();
    }, [activeFilters, user]);

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
        updateFilters('month', month);
    };

    // Handle time filtering (24-hour format)
    const handleTimeFilter = (time) => {
        updateFilters('time', time);
    };

    // Handle active/inactive filtering
    const handleActiveFilter = (isActive) => {
        updateFilters('isActive', isActive);
    };

    // Handle registered/not registered filtering
    const handleRegisteredFilter = (isRegistered) => {
        updateFilters('isRegistered', isRegistered);
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
                handleActiveFilter,
                handleRegisteredFilter,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};

// Custom hook to use the EventContext
export const useEventContext = () => useContext(EventContext);