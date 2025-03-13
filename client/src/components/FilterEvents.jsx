// FilterEvents.js
import React from 'react';
import { useEventContext } from '../../context/eventContext';

const FilterEvents = () => {
    const { handleSortChange, handleMonthFilter, handleTimeFilter } = useEventContext();

    return (
        <div className="flex flex-wrap gap-4 p-4 bg-base-200 rounded-lg mb-6">
            {/* Sort Dropdown */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Sort By</span>
                </label>
                <select
                    className="select select-bordered"
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <option value="newest">Newest to Oldest</option>
                    <option value="oldest">Oldest to Newest</option>
                </select>
            </div>

            {/* Month Filter Dropdown */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Filter By Month</span>
                </label>
                <select
                    className="select select-bordered"
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
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Filter By Start Time</span>
                </label>
                <select
                    className="select select-bordered"
                    onChange={(e) => handleTimeFilter(e.target.value)}
                >
                    <option value="">All Times</option>
                    <option value="morning">Morning (6 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                </select>
            </div>
        </div>
    );
};

export default FilterEvents;