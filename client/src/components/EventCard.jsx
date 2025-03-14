import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext'; // Adjust the import path as needed
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EventCard = ({ event, loading }) => {
    const { user } = useContext(UserContext); // Get the user from UserContext
    const [isRegistered, setIsRegistered] = useState(false); // Track registration status
    const [showModal, setShowModal] = useState(false); // Control modal visibility

    useEffect(() => {
        const checkUserRegistration = async () => {
            if (user) {
                try {
                    const response = await axios.get(`/api/user-events/check-registration`, {
                        params: { event_id: event.event_id } // Only pass event_id
                    });
                    if (response.data.isRegistered) {
                        setIsRegistered(true);
                    }
                } catch (error) {
                    console.error('Error checking registration:', error);
                }
            }
        };

        checkUserRegistration();
    }, [event, user]);

    // Determine if the event is inactive based on the current date
    const currentDate = new Date();
    const eventStartDate = new Date(event.start_date);
    const isInactive = eventStartDate < currentDate || event.status.toLowerCase() !== 'active';

    // Handle registration
    const handleRegister = async () => {
        if (!user) {
            setShowModal(true); // Show the modal if the user is not logged in
            return;
        }

        if (user.role === 'organization') {
            return; // Do not allow organizations to register
        }

        try {
            const response = await axios.post('/api/user-events/register', {
                event_id: event.event_id, // Assuming the event object has an `event_id` field
                user_id: user.user_id, // Assuming the user object has a `user_id` field
            });
            if (response.status === 201) {
                setIsRegistered(true); // Update registration state
                toast.success('Successfully registered for the event!');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error('Failed to register for the event.');
        }
    };

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
                    <div className="skeleton h-4 w-40 mb-2"></div> {/* Start Time placeholder */}
                    <div className="skeleton h-4 w-40 mb-2"></div> {/* End Date placeholder */}
                    <div className="skeleton h-4 w-40 mb-2"></div> {/* End Time placeholder */}
                    <div className="skeleton h-4 w-32 mb-2"></div> {/* Requirements placeholder */}
                    <div className="skeleton h-4 w-24 mb-2"></div> {/* Status placeholder */}
                    <div className="skeleton h-4 w-48 mb-2"></div> {/* Organization Name placeholder */}
                    <div className="skeleton h-4 w-64 mb-2"></div> {/* Organization Contact Email placeholder */}
                    <div className="skeleton h-10 w-32"></div> {/* Button placeholder */}
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
        start_time,
        end_date,
        end_time,
        requirements,
        status,
        org_name, // Organization name
        org_logo, // Organization logo
        org_contact_email, // Organization contact email
    } = event;

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
                <p><strong>Start Time:</strong> {start_time}</p>
                <p><strong>End Date:</strong> {new Date(end_date).toLocaleDateString()}</p>
                <p><strong>End Time:</strong> {end_time}</p>
                <p><strong>Requirements:</strong> {requirements}</p>
                <p><strong>Status:</strong> {isInactive ? 'INACTIVE' : status.toUpperCase()}</p>
                <p><strong>Organization:</strong> {org_name}</p>
                <p><strong>Contact Email:</strong> {org_contact_email}</p>
                <div className="card-actions justify-center md:justify-end">
                    {(!user || user.role !== 'organization') && ( // Show button if not logged in or not an organization
                        <div className="tooltip"
                             data-tip={isRegistered ? "Already registered" : (isInactive ? "This event is inactive" : "Volunteering is fun!")}>
                            <button
                                className={`btn ${isRegistered ? 'bg-green-500 text-white' : (isInactive ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-[#5F477E] text-white hover:bg-[#7539C2]')}`}
                                disabled={isInactive && !isRegistered} // Disable only if inactive and not registered
                                onClick={handleRegister}
                            >
                                {isRegistered ? 'You Registered' : (isInactive ? 'Event is inactive' : 'Register to Volunteer')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <dialog className="modal" open={showModal}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Sign Up or Log In</h3>
                    <p className="py-4">You need to log in or sign up to register for this event.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <div className='flex gap-2'>
                            <button className="btn" onClick={() => window.location.href = '/login'}>Log In</button>
                            <button className="btn bg-gray-700 hover:bg-gray-600 text-white" onClick={() => window.location.href = '/signup'}>Sign Up</button>
                            <button className="btn btn-error text-white" onClick={() => setShowModal(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default EventCard;