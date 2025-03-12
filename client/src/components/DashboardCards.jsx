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
  }]
  
  return (
    <>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-10">
            {/* Line graph */}
            <div className="w-[90%] lg:w-1/2 h-full">
                <h1 className="text-2xl font-bold my-5">Volunteer Stats</h1>
                <Line data={data} options={options} />
            </div>
            {/* Upcoming event table  */}  
              <div className='lg:w-1/2 h-full'>
              <h1 className="text-2xl font-bold my-5">Upcoming Events</h1>
                <div className="overflow-x-auto">
                  <table className="table">
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
                          <tr className="hover:bg-base-300">
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
            {/* Volunteer table */}
            <div className="my-10">
            <h1 className="text-2xl font-bold my-5">Event Volunteers</h1>
              <div className="overflow-x-auto">
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
    </>
  )
}

export default DashboardCards
