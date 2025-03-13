import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import axios from "axios";
import { useState, useEffect } from "react";

function DashboardCards({user, formatTime}) {
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
        label: "Volunteers",
        data: [5, 10, 20, 10, 25],
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
  };


  const mockUsers = [{
    name: 'Felix Willem',
    email: 'felix1@yahoo.com',
    event: 'Charity event',
    location: 'Charlotte, NC'
  }, { 
    name: 'Sean Pichay',
    email: 'SeanP@gmail.com',
    event: 'Food drive', 
    location: 'Fort Mill, SC' 
  }, {
    name: 'Jenny Kim',
    email: 'jenny@hotmail.com',
    event: 'Blood drive',
    location: 'Rock Hill, SC'
  }, {
    name: 'Walter White',
    email: 'heisenberg@gmail.com',
    event: 'Charity event',
    location: 'Charlotte, NC'
  }]

  const mockEvents = [{
    name: 'Charity event',
    location: 'Charlotte, NC',
    date: '2022-09-30',
    time: '10:00 AM'
  }, {
    name: 'Food drive',
    location: 'Fort Mill, SC',
    date: '2022-10-15',
    time: '11:00 AM',
  }, {
    name: 'Blood drive',
    location: 'Rock Hill, SC',
    date: '2022-11-20',
    time: '9:00 AM'
  },{
    name: 'Plasma drive',
    location: 'Rock Hill, SC',
    date: '2022-11-20',
    time: '9:00 AM'
  }]
  
  const [userEvents, setUserEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

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

      // Filter the events that are within 2 weeks from today
      const filteredUpcomingEvents = userEvents.filter(event => {
        const eventStartDate = new Date(event.start_date);
        return eventStartDate >= today && eventStartDate <= twoWeeksFromNow;
      });

      setUpcomingEvents(filteredUpcomingEvents);
    } catch (error) {
      console.error('Error fetching upcoming events for user:', error);
    }
  };

  useEffect(() => {
    getUserEvents();
  },[user])

  useEffect(() => {
    if (userEvents.length > 0) { 
        getUpcomingEvents();
    }
}, [userEvents]);

  upcomingEvents ? console.log(upcomingEvents, '<< upcoming events') : null;
  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-10 lg:h-80 xl:h-3/4"> 
  
            {/* Line graph */}
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body rounded-lg h-full">
                <h2 className="card-title">Volunteer Hours</h2>
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
                        {upcomingEvents.length > 0 ? upcomingEvents.map((event, index) => {
                          return (
                            <tr className="hover:bg-gray-200" key={index}>
                              <td>{event.title}</td>
                              <td>{event.location}</td>
                              <td>{new Date(event.start_date).toLocaleDateString()}</td>
                              <td>{formatTime(event.start_time)}</td>
                            </tr>
                          )
                        }) : null }     
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
                        {user.role === 'organization' ? 
                        <> 
                          <thead>
                            <tr>
                              <th></th>
                              <th>Volunteer name</th>
                              <th>Email</th>
                              <th>Event</th>
                              <th>location</th>
                            </tr>
                          </thead>
                          <tbody>
                          {mockUsers.map((user, index) => {
                            return (
                              <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.event}</td>
                                <td>{user.location}</td>
                              </tr>
                            )
                          })}
                          </tbody> </> : 
                        <> 
                          <thead>
                            <tr>
                              <th>Event</th>
                              <th>Description</th>
                              <th>Organization Email</th>
                              <th>Location</th>
                              <th>Start Date</th>
                            </tr>
                          </thead>
                          <tbody>
                          {userEvents.map((event, index) => {
                            return (
                              <tr key={index}>
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td>{event.contact_email}</td>
                                <td>{event.location}</td>
                                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                              </tr>
                            )
                          })}
                          </tbody> 
                        </>}
                      </table>
                    </div>
              </div>
              </div>
            </div>
    </>
  )
}

export default DashboardCards
