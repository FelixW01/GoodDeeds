import { useState } from "react";
import DashboardCards from "../components/DashBoardCards";

function DashboardPage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const mockIcons = [
    'img/teamtrees.png',
    'img/teamseas.png',
  ]

  return (
      <section className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="w-[90%] l:w-[90%] xl:w-[80%] flex flex-col items-center justify-center py-10">
          <div className='lg:min-w-full max-w-[80%]'>
          <div role="tablist" className="tabs tabs-lift justify-start">
            <a
              role="tab"
              className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
              onClick={() => handleTabClick(1)}
            >
              Statistics
            </a>

            <a
              role="tab"
              className={`tab ${activeTab === 2 ? "tab-active" : ""}`}
              onClick={() => handleTabClick(2)}
            >
              Create Event
            </a>
          </div>
          <div className="flex flex-row justify-center gap-10 mt-10 lg:justify-start">
            {mockIcons.map((icon, index) => {
              return (
                <img key={index} src={icon} alt="icon" className="w-[70px] h-[60px] sm:w-[110px] sm:h-[100px] lg:w-[150px] lg:h-[140px]"  />
              )
            })}
          </div>
            <div className="min-h-full">
              {activeTab === 1 ? <DashboardCards /> : null}
            </div>
          </div>
      </div>
    </section>
  )
}

export default DashboardPage
