import React from 'react';

const EventCard = ({ event, loading }) => {
    // If loading is true, render skeleton placeholders
    if (loading) {
        return (
            <div className="card card-side shadow-sm w-8/12 rounded-lg bg-gray-200 p-4">
                <div className="skeleton h-32 w-32 rounded-lg"></div> {/* Image placeholder */}
                <div className="card-body">
                    <div className="skeleton h-8 w-48 mb-4"></div> {/* Title placeholder */}
                    <div className="skeleton h-4 w-64 mb-2"></div> {/* Description placeholder */}
                    <div className="skeleton h-4 w-56 mb-2"></div> {/* Location placeholder */}
                    <div className="skeleton h-4 w-40 mb-2"></div> {/* Start Date placeholder */}
                    <div className="skeleton h-4 w-40 mb-2"></div> {/* End Date placeholder */}
                    <div className="skeleton h-4 w-32 mb-2"></div> {/* Requirements placeholder */}
                    <div className="skeleton h-4 w-24 mb-2"></div> {/* Status placeholder */}
                    <div className="skeleton h-4 w-48 mb-2"></div> {/* Organization Name placeholder */}
                    <div className="skeleton h-4 w-64 mb-2"></div> {/* Organization Contact Email placeholder */}
                    <div className="card-actions justify-end">
                        <div className="skeleton h-10 w-32"></div> {/* Button placeholder */}
                    </div>
                </div>
            </div>
        );
    }

    // If not loading, render the actual event data
    const {
        title,
        description,
        location,
        start_date,
        end_date,
        requirements,
        status,
        org_name, // Organization name
        org_logo, // Organization logo
        org_contact_email, // Organization contact email
    } = event;

    // Check if the event is inactive (anything that doesn't say "active")
    const isInactive = status.toLowerCase() !== 'active';

    return (
        <div className="card md:card-side shadow-sm w-10/12 lg:w-8/12 rounded-lg bg-gray-200 p-4">
            <img
                src={"/img/modern-building-logo-simplified.svg" || org_logo} // Use organization logo or a default image
                alt="Organization Logo"
                className="h-32 md:h-48 my-auto"
            />

            <div className="card-body">
                <h2 className="card-title lg:text-4xl">{title}</h2>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Start Date:</strong> {new Date(start_date).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
                <p><strong>Requirements:</strong> {requirements}</p>
                <p><strong>Status:</strong> {status.toUpperCase()}</p>
                <p><strong>Organization:</strong> {org_name}</p>
                <p><strong>Contact Email:</strong> {org_contact_email}</p>
                <div className="card-actions justify-end">
                    <div className="tooltip" data-tip={isInactive ? "This event is inactive" : "Volunteering is fun!"}>
                        <button
                            className={`btn ${isInactive ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-[#5F477E] text-white hover:bg-[#7539C2]'}`}
                            disabled={isInactive}
                        >
                            Register to Volunteer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;