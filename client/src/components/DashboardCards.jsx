import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2";

function DashboardCards() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Sales",
        data: [50, 60, 70, 180, 190],
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
  
  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-10 lg:h-80 xl:h-3/4"> 
  
            {/* Line graph */}
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body rounded-lg h-full">
                <h2 className="card-title">Volunteer Stats</h2>
                <Line data={data} options={options} className="h-full" /> 
              </div>
            </div>
            
            {/* Upcoming event table  */}  
            <div className="card card-border flex-1 h-full w-full lg:max-w-[50%]"> 
              <div className="card-body bg-base-300 rounded-lg h-full">
                <h2 className="card-title">Upcoming Events</h2>
                <div className='h-full'>
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
                        {mockEvents.map((event) => {
                          return (
                            <tr className="hover:bg-gray-200" key={event.id}>
                              <td>{event.name}</td>
                              <td>{event.location}</td>
                              <td>{event.date}</td>
                              <td>{event.time}</td>
                            </tr>
                          )
                        })}     
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Volunteer table */}
          <div className="card card-border h-full w-full ">
              <div className="card-body bg-base-300 rounded-lg">
                <h2 className="card-title">Volunteers Info</h2>
                <div className="my-10 bg-base-300">
                    <div className="overflow-x-auto overflow-y-auto">
                      <table className="table table-xs">
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
