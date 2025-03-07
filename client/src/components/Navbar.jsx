import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm lg:hidden bg-[#664395] text-white">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                <li><Link to="/signup">For Organizations</Link></li>
                <li><Link to="/signup">For Volunteers</Link></li>
                <li><Link to="/listing">Events</Link></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl">GoodDeeds</a>
        </div>
        <div className="navbar-end">
            <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
            </button>
        </div>
      </div>
      
        <div className="navbar bg-[#664395] shadow-sm gap-3 justify-between items-center text-white hidden lg:flex">
              <div>
                <a className="btn border-none shadow-none bg-[#664395] text-xl text-white hover:bg-purple-950"><Link to="/">GoodDeeds</Link></a>
              </div>
              <div className="flex gap-4">
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/listing">Events</Link></button>
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/signup">For Organizations</Link></button>
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/signup">For Volunteers</Link></button>
              </div>
            {isLoggedIn ?
            <div className="flex gap-2">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"/>
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div> :
            <div className="flex gap-4">
              <Link to="/login"><button className="btn btn-outline bg-white rounded-xl w-24 text-black transition duration-300 ease-in-out hover:shadow-md">
                Login
              </button></Link>
              <Link to="/signup"><button className="btn btn-active btn-primary bg-black mr-4 rounded-xl w-24 text-white transition duration-300 ease-in-out hover:bg-purple-950 hover:shadow-md">
                Sign Up
              </button> </Link>
            </div>
            }
        </div>
    </>
  )
}

export default Navbar
