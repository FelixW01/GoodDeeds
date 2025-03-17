import { useState, useContext, useEffect } from "react";
import DashboardCards from "../components/DashboardCards";
import { UserContext } from '../../context/userContext';
import CreateEventCard from "../components/CreateEventCard";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState(1);
  const [eventHeaders, setEventHeaders] = useState([]);
  const [currentEventView, setCurrentEventView] = useState(null)
  
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleIconClick = (eventId) => {
    setCurrentEventView(eventId);
  };

  const { user, capitalize, formatTime } = useContext(UserContext); 

  useEffect(() => {
  if (eventHeaders.length > 0) {
    setCurrentEventView(eventHeaders[0].id);
    }
  }, [eventHeaders]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white mt-10 mb-28">
      {user ? (
        <div className="w-[90%] l:w-[90%] xl:w-[80%] flex flex-col items-center justify-center py-10">
          <div className="lg:min-w-full max-w-[80%]">
            <div role="tablist" className="tabs tabs-lift justify-start">
              <a
                role="tab"
                className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
                onClick={() => handleTabClick(1)}
              >
                Statistics
              </a>

              {user.role === 'organization' && (
                <a
                  role="tab"
                  className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
                  onClick={() => handleTabClick(2)}
                >
                  Create Event
                </a>
              )}
            </div>

            {user.role === 'organization' ? (
              <div className="flex flex-col items-center justify-center lg:items-start mt-10 lg:justify-start">
                {activeTab === 1 ? (
                    <select defaultValue="Pick an event" className="select" onChange={(e) => handleIconClick(e.target.value)}>
                      {eventHeaders.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.title}
                        </option>
                      ))}
                    </select>
                ) : null}
              </div>
            ) : (
              <h1 className="text-3xl font-bold text-gray-800 mb-4 my-10">
                Welcome, {capitalize(user.first_name)} {capitalize(user.last_name)}
              </h1>
            )}

            <div className="min-h-full">
              {activeTab === 1 ? (
                <DashboardCards
                  user={user}
                  formatTime={formatTime}
                  currentEventView={currentEventView}
                  setEventHeaders={setEventHeaders}
                />
              ) : (
                <CreateEventCard setActiveTab={setActiveTab} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>loading . . .</h1>
      )}
    </section>
  )
}

export default DashboardPage
