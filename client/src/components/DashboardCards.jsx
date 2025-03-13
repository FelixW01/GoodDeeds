import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import axios from "axios";
import { useState, useEffect } from "react";

function DashboardCards({user, formatTime, currentEventView, setEventHeaders}) {
  const getMonthLabels = () => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  // Get current month (0-11)
  const currentMonth = new Date().getMonth(); 
  const labels = [];
  
  // 6 months including the current month
  for (let i = 0; i < 6; i++) { 
    // %12 will loop around if i exceeds 12 (December)
    labels.push(months[(currentMonth + i) % 12]); 
  }

  return labels;
};
  const data = {
    labels: getMonthLabels(),
    datasets: [
      {
        label: user.role === "organization" ? "Volunteers" : "Volunteer Hours",
        data: [5, 10, 20, 10, 25],
        borderColor: "#BFDBF7",
        backgroundColor: "#BFDBF7",
      },  
    ],
  };

  const options = {
    responsive: true,
  };

  let volunteerCounter = 1;
  
  const [userEvents, setUserEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [organizationEvents, setOrganizationEvents] = useState([]);
  const [upcomingOrganizationEvents, setUpcomingOrganizationEvents] = useState([]);
  

  const getOrganization = async () => {
      try {
          const response = await axios.get('/api/events/org/get');
          const eventHeaders = response.data.map(event => {
              return {
                  title: event.title,
                  id: event.event_id,
              };
          });
          // console.log('User  Events:', response.data);
          setOrganizationEvents(response.data);
          setEventHeaders(eventHeaders);
      } catch (error) {
          console.error('Error fetching user events:', error);
      }
  };

  const getUserEvents = async () => {
      try {
          const response = await axios.get('/api/user-events/user/get');
          console.log('User  Events:', response.data);
          setUserEvents(response.data);
      } catch (error) {
          console.error('Error fetching user events:', error);
      }
  };

  const getUpcomingEvents = async () => {
    try {
        const today = new Date();
        const twoWeeksFromNow = new Date(today);
        // Add 14 days for 2 weeks
        twoWeeksFromNow.setDate(today.getDate() + 14);

        let filteredUpcomingEvents = [];

        if (user.role === 'organization') {
            // Filter organization events if role is 'organization'
            filteredUpcomingEvents = organizationEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                return eventStartDate >= today && eventStartDate <= twoWeeksFromNow;
            });
            setUpcomingOrganizationEvents(filteredUpcomingEvents);
        } else {
            // Filter user events if role is not 'organization'
            filteredUpcomingEvents = userEvents.filter(event => {
                const eventStartDate = new Date(event.start_date);
                return eventStartDate >= today && eventStartDate <= twoWeeksFromNow;
            });
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
                <h2 className="card-title">{user.role === 'user' ? 'Volunteer Hours' : 'Volunteer Statistics'}</h2>
                <Line data={data} options={options} className="h-full" /> 
              </div>
            </div>
            
            {/* Upcoming event table  */}  
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body bg-base-300 rounded-lg h-full bg-gradient-to-r from-[#F7F7F7] to-[#E5D8F5]">
                <h2 className="card-title">Upcoming Events</h2>
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
                        {user.role === "organization" 
                          ? (upcomingOrganizationEvents.length > 0 ? upcomingOrganizationEvents.map((event, index) => {
                              return (
                                <tr className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg" key={index}>
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              );
                            }) : 
                            <tr>
                              <td colSpan="4" className="text-center">No upcoming organization events</td>
                            </tr>
                          )
                          : (upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => {
                              return (
                                <tr className="hover:bg-gradient-to-r from-[#E0E0E0] to-[#D1B8F1] rounded-xl hover:shadow-lg" key={index}>
                                  <td>{event.title}</td>
                                  <td>{event.location}</td>
                                  <td>{new Date(event.start_date).toLocaleDateString()}</td>
                                  <td>{formatTime(event.start_time)}</td>
                                </tr>
                              );
                            }) : 
                            <tr>
                              <td colSpan="4" className="text-center">No upcoming events</td>
                            </tr>
                          )
                        }     
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
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
              </div>
            </div>
        </div>
     </>
  )
}

export default DashboardCards
