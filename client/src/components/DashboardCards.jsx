import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import axios from "axios";
import { useState, useEffect } from "react";

function DashboardCards({user, formatTime, currentEventView, setEventHeaders}) {
  const [monthlyHours, setMonthlyHours] = useState(Array(6).fill(0));
  const [monthlyVolunteerCounts, setMonthlyVolunteerCounts] = useState(Array(6).fill(0));

  // This returns the month labels for the chart, the last 6 months
  const getMonthLabels = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  return Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - (5 - i) + 12) % 12;
    return months[monthIndex];
  });
};

// Gather all the hours worked and volunteers for the last 6 months, this is used to populate the chart
const aggregateHoursByMonth = (events) => {
  const currentMonth = new Date().getMonth();
  // This creates an array with 6 empty slots and fills it with 0 as the starting point
  const lastSixMonths = Array(6).fill(0);
  const lastSixMonthsVolunteers = Array(6).fill(0);

  events.forEach(event => {
      // Check if the event has hours worked or volunteer names (if it exists)
      const hasVolunteers = Array.isArray(event.volunteer_names) && event.volunteer_names.length > 0;
      if (event.hours_worked || hasVolunteers) {
          const eventMonth = new Date(event.start_date).getUTCMonth();
          // Calculate the difference in months between the current month and the event month
          const monthDiff = (currentMonth - eventMonth + 12) % 12;
          // Only consider events within the last 6 months
          if (monthDiff < 6) {
              // Add the event hours worked and add it to the corresponding month
              if (event.hours_worked) {
                  lastSixMonths[5 - monthDiff] += parseFloat(event.hours_worked);
              }
              // Add the number of volunteers (if available) and add it to the corresponding month
              if (hasVolunteers) {
                  lastSixMonthsVolunteers[5 - monthDiff] += event.volunteer_names.length;
              }
          }
      }
  });

  setMonthlyHours(lastSixMonths);
  setMonthlyVolunteerCounts(lastSixMonthsVolunteers);
};

  // console.log(monthlyVolunteerCounts, '<< monthly Volunteer counts')

  const data = {
    labels: getMonthLabels(),
    datasets: [
      {
        label: user.role === "organization" ? "Volunteers" : "Volunteer Hours",
        data: user.role === "organization" ? monthlyVolunteerCounts : monthlyHours,
        borderColor: "#BFDBF7",
        backgroundColor: "#BFDBF7",
      },  
    ],
  };

 const options = {
  responsive: true,
  scales: {
    y: {
      type: 'linear',
      position: 'left',
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0,
        callback: (value) => Math.floor(value)
      }
    }
  }
};

  let volunteerCounter = 1;
  
  const [userEvents, setUserEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [organizationEvents, setOrganizationEvents] = useState([]);
  const [upcomingOrganizationEvents, setUpcomingOrganizationEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteerHours, setVolunteerHours] = useState(0);
  const [currentOrgEvents, setCurrentOrgEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [activeTab, setActiveTab] = useState(2);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVolunteerHours("");
  };

  const submitHours = () => {
    if (selectedEvent) {
      console.log('Submitting hours:', volunteerHours);
      updateUserHours();
      closeModal();
    }
  };

  const getOrganization = async () => {
      try {
          const response = await axios.get('/api/events/org/get');
          const eventHeaders = response.data.map(event => {
              return {
                  title: event.title,
                  id: event.event_id,
              };
          });
          console.log(response.data, '<< organization events')
          setOrganizationEvents(response.data);
          setEventHeaders(eventHeaders);

          aggregateHoursByMonth(response.data);
      } catch (error) {
          console.error('Error fetching user events:', error);
      }
  };

  const getUserEvents = async () => {
      try {
          const response = await axios.get('/api/user-events/user/get');
          setUserEvents(response.data);
          aggregateHoursByMonth(response.data);
      } catch (error) {
          console.error('Error fetching user events:', error);
      }
  };
  
  const updateUserHours = async () => {
       try {
        const response = await axios.put('/api/user-events/update', {
          user_event_id: selectedEvent.user_event_id,
          hours_worked: volunteerHours,
        });
        console.log(response.data);
        setVolunteerHours('');
        closeModal();

        // Refetch user events to update chart data
        getUserEvents();
      } catch (error) {
        console.error('Error updating hours:', error);
      }
  };

  // Fetch upcoming events and filter them by upcoming and current events
  const getUpcomingEvents = async () => {
    try {
        const today = new Date();
        const twoWeeksFromNow = new Date(today);
        // Add 14 days for 2 weeks
        twoWeeksFromNow.setDate(today.getDate() + 14);

        let filteredUpcomingEvents = [];
        let filteredCurrentOrgEvents = [];
        let filteredCurrentEvents = [];

        if (user.role === 'organization') {
            // Filter organization events by upcoming events
            filteredUpcomingEvents = organizationEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                return eventStartDate >= today && eventStartDate <= twoWeeksFromNow;
            });

            // Filter user events by current events
            filteredCurrentOrgEvents = organizationEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                const eventEndDate = new Date(event.end_date);

                // Check if today's date is within the event's date range
                return eventStartDate <= today && eventEndDate >= today;
            });

            setUpcomingOrganizationEvents(filteredUpcomingEvents);
            setCurrentOrgEvents(filteredCurrentOrgEvents);
        } else {
            // Filter user events by upcoming events
            filteredUpcomingEvents = userEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                return eventStartDate >= today && eventStartDate <= twoWeeksFromNow;
            });

            // Filter user events by current events
            filteredCurrentEvents = userEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                const eventEndDate = new Date(event.end_date);
                
                // Check if today's date is within the event's date range
                return eventStartDate <= today && eventEndDate >= today;
            });
            
            setCurrentEvents(filteredCurrentEvents);
            setUpcomingEvents(filteredUpcomingEvents);
        }
      } catch (error) {
          console.error('Error fetching upcoming events:', error);
      }
  };

  useEffect(() => {
    user.role === 'organization' ? getOrganization() : getUserEvents();
  },[user])

  useEffect(() => {
    if (organizationEvents.length > 0 || userEvents.length > 0) {
        getUpcomingEvents();
    } 
}, [userEvents, organizationEvents]);


  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-10 lg:h-80 xl:h-3/4"> 
  
            {/* Line graph */}
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body rounded-lg h-full">
                <h2 className="card-title">{user.role === 'user' ? 'Volunteer Hours' : 'Number of Volunteers'}</h2>
                <Line data={data} options={options} className="h-full" /> 
              </div>
            </div>
            
            {/* Upcoming event table  */}  
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body bg-base-300 rounded-lg h-full bg-gradient-to-r from-[#F7F7F7] to-[#E5D8F5]">
                <div role="tablist" className="tabs tabs-border">
                    <>
                      <a role="tab" className={`tab ${activeTab === 2 ? "tab-active !bg-transparent" : ""}`} onClick={() => handleTabClick(2)}>
                          Current Events
                      </a> 
                      <a role="tab" className={`tab ${activeTab === 1 ? "tab-active !bg-transparent" : ""}`} onClick={() => handleTabClick(1)}>
                          Upcoming Events
                      </a>
                    </>
                </div>
                <div className='h-full overflow-y-hidden'>
                  <div className="overflow-x-auto h-full overflow-y-auto max-h-[400px]">
                    <table className="table table-auto w-full">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Location</th>
                          <th>Date</th>
                          <th>Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.role === "organization" ? (
                          // If user.role is "organization", show both upcoming and current events
                          activeTab === 1 ? (
                            // Show Upcoming Events when activeTab is 1
                            upcomingOrganizationEvents.length > 0 ? (
                              upcomingOrganizationEvents.map((event, index) => (
                                <tr
                                  className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg"
                                  key={index}
                                >
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">No upcoming organization events</td>
                              </tr>
                            )
                          ) : activeTab === 2 ? (
                            // Show Current Events when activeTab is 2
                            currentOrgEvents.length > 0 ? (
                              currentOrgEvents.map((event, index) => (
                                <tr
                                  className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg"
                                  key={index}
                                >
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">No current organization events</td>
                              </tr>
                            )
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">Select a tab</td>
                            </tr>
                          )
                        ) : (
                          // User role logic (same as organization but with user-specific states)
                          activeTab === 1 ? (
                            upcomingEvents.length > 0 ? (
                              upcomingEvents.map((event, index) => (
                                <tr
                                  className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg"
                                  key={index}
                                >
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">No upcoming events</td>
                              </tr>
                            )
                          ) : activeTab === 2 ? (
                            currentEvents.length > 0 ? (
                              currentEvents.map((event, index) => (
                                <tr
                                  className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg"
                                  key={index}
                                >
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="4" className="text-center">No current events</td>
                              </tr>
                            )
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">Select a tab</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Volunteer table */}
          <div className="card card-border h-full w-full ">
              <div className="card-body bg-base-300 rounded-lg bg-gradient-to-r from-[#F7F7F7] to-[#E5D8F5]">
                {user.role === 'organization' ? <h2 className="card-title">Volunteers Information</h2> : <h2 className="card-title">Event Infornation</h2>}
                <div className="my-10 bg-base-300 bg-gradient-to-r from-[#F7F7F7] to-[#E5D8F5]">
                    <div className="overflow-x-auto overflow-y-auto">
                      <table className="table table-xs">
                        <thead>
                          {user.role === 'organization' ? (
                            <tr>
                              <th></th>
                              <th>Volunteer name</th>
                              <th>Email</th>
                              <th>Event</th>
                              <th>Location</th>
                            </tr>
                          ) : (
                            <tr>
                              <th>Event</th>
                              <th>Description</th>
                              <th>Organization Email</th>
                              <th>Location</th>
                              <th>Start Date</th>
                            </tr>
                          )}
                        </thead> 
                        <tbody>
                          {user.role === 'organization'
                            ? organizationEvents
                            .filter(event => event.event_id === currentEventView)
                            .map(event => (
                                event.volunteer_names.map((volunteerName, volunteerIndex) => {
                                    const currentIndex = volunteerCounter++;
                                    
                                    return (
                                        <tr key={`${event.event_id}-${volunteerIndex}`}>
                                            <th>{currentIndex}</th>
                                            <td>{volunteerName}</td>
                                            <td>{event.volunteer_emails[volunteerIndex]}</td>        
                                            <td>{event.title}</td>
                                            <td>{event.location}</td>
                                        </tr>
                                    );
                                })
                            ))
                            : userEvents.map((event, index) => (
                                <tr key={index}>
                                  <td>{event.title}</td>
                                  <td>{event.description}</td>
                                  <td>{event.contact_email}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>
                                    {new Date(event.start_date) > new Date() ? (
                                      <div className="tooltip tooltip-left" data-tip="Available after event date">
                                        <button className="btn btn-disabled">
                                          Log Hours
                                        </button>
                                      </div>
                                    ) : (
                                      <button className="btn btn-primary" onClick={() => openModal(event)}>
                                        Log Hours
                                      </button>
                                    )}
                                  </td>           
                                </tr>
                              ))}
                        </tbody>
                      </table>
                      {/* Modal */}
                      {isModalOpen && (
                        <div className="modal modal-open">
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">Log Hours for {selectedEvent?.title}</h3>
                            <input
                              type="number"
                              className="input input-bordered w-full mt-3"
                              placeholder="Enter hours"
                              onChange={(e) => setVolunteerHours(e.target.value)}
                            />
                            <div className="modal-action">
                              <button className="btn btn-success" onClick={submitHours}>
                                Submit
                              </button>
                              <button className="btn" onClick={closeModal}>
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
              </div>
            </div>
        </div>
     </>
  )
}

export default DashboardCards
