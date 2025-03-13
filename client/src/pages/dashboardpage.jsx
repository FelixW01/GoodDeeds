import { useState, useContext } from "react";
import DashboardCards from "../components/DashboardCards";
import { UserContext } from '../../context/userContext';


function DashboardPage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const mockIcons = [
    'img/teamtrees.png',
    'img/teamseas.png',
  ]

  const { user, capitalize, formatTime } = useContext(UserContext); 

  user ? console.log(user) : null;

  return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-white">
        {user ? <div className="w-[90%] l:w-[90%] xl:w-[80%] flex flex-col items-center justify-center py-10">
          <div className='lg:min-w-full max-w-[80%]'>
          <div role="tablist" className="tabs tabs-lift justify-start">
            <a
              role="tab"
              className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Statistics
            </a>

            {user.role === 'organization' ? <a
              role="tab"
              className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              Create Event
            </a> : null}
          </div>
          { user.role === 'organization' ? <div className="flex flex-row justify-center gap-10 mt-10 lg:justify-start">
            {mockIcons.map((icon, index) => {
              return (
                <img key={index} src={icon} alt="icon" className="w-[70px] h-[60px] sm:w-[110px] sm:h-[100px] lg:w-[150px] lg:h-[140px]"  />
              )
            })}
          </div> : <h1 className="text-3xl font-bold text-gray-800 mb-4 my-10">Welcome, {capitalize(user.first_name)} {capitalize(user.last_name)}</h1>}
            <div className="min-h-full">
              {activeTab === 1 ? <DashboardCards user={user} formatTime={formatTime} /> : null}
            </div>
          </div>
      </div> : <h1>loading . . .</h1>}
    </section>
  )
}

export default DashboardPage
