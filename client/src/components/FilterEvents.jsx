import React, { useContext, useState } from 'react';
import { useEventContext } from '../../context/eventContext';
import { UserContext } from '../../context/UserContext';

const FilterEvents = () => {
    const { user } = useContext(UserContext); // Get the user from UserContext
    const { handleSortChange, handleMonthFilter, handleTimeFilter, handleActiveFilter, handleRegisteredFilter } = useEventContext();

    // State to control visibility of filters on small screens
    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="flex flex-col gap-4 p-4 bg-base-200 rounded-lg mb-6">
            {/* Button to toggle filters on small screens */}
            <button
                className="md:hidden hover:underline text-black"
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>

            {/* Filters Container */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:flex flex-wrap gap-4`}>
                {/* Sort Dropdown */}
                <div className="form-control w-full md:w-32 lg:w-44">
                    <label className="label">
                        <span className="label-text md:text-sm lg:text-lg">Sort By</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => handleSortChange(e.target.value)}
                    >
                        <option value="newest">Newest to Oldest</option>
                        <option value="oldest">Oldest to Newest</option>
                    </select>
                </div>

                {/* Month Filter Dropdown */}
                <div className="form-control w-full md:w-32 lg:w-44">
                    <label className="label">
                        <span className="label-text md:text-sm lg:text-lg">Filter By Month</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => handleMonthFilter(e.target.value)}
                    >
                        <option value="">All Months</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>

                {/* Time Filter Dropdown */}
                <div className="form-control w-full md:w-32 lg:w-44">
                    <label className="label">
                        <span className="label-text md:text-sm lg:text-lg">Filter By Start Time</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => handleTimeFilter(e.target.value)}
                    >
                        <option value="">All Times</option>
                        <option value="morning">Morning (6 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                    </select>
                </div>

                {/* Active/Inactive Filter */}
                <div className="form-control w-full md:w-32 lg:w-44">
                    <label className="label">
                        <span className="label-text md:text-sm lg:text-lg">Filter By Status</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        onChange={(e) => handleActiveFilter(e.target.value === 'active')}
                    >
                        <option value="">All Events</option>
                        <option value="active">Active Events</option>
                        <option value="inactive">Inactive Events</option>
                    </select>
                </div>

                {/* Registered/Not Registered Filter */}
                {user && user.role !== 'organization' && ( // Only show if user is logged in and not an organization
                    <div className="form-control w-full md:w-32 lg:w-44">
                        <label className="label">
                            <span className="label-text md:text-sm lg:text-lg">Filter By Registration</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            onChange={(e) => handleRegisteredFilter(e.target.value === 'registered')}
                        >
                            <option value="">All Events</option>
                            <option value="registered">Registered Events</option>
                            <option value="not-registered">Not Registered Events</option>
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterEvents;