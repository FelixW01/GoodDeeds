// EventList.js
import React from 'react';
import EventCard from './EventCard';
import FilterEvents from './FilterEvents';
import { useEventContext } from '../../context/eventContext';

const EventList = () => {
    const { filteredEvents, loading, error, handleSortChange, handleMonthFilter, handleTimeFilter } =
        useEventContext();

    if (error) {
        return <div>Error: {error}</div>;
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