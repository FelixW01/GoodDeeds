import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { toast } from 'react-hot-toast';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user, logout } = useContext(UserContext); 

  useEffect(() => {
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  },[user])

  const handleLogOut = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      toast.success(`Successfully logged out.} `)
    }
    catch (err) {
      console.error('Error logging out:', err);
    }
  }
  return (
    <>
      <div className="navbar shadow-sm lg:hidden bg-[#664395] text-white">
        <div className="navbar-start">
            <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-xl transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md border-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                <li><Link to="/listing">Events</Link></li>
                {isLoggedIn ? <li><Link to="/dashboard">Dashboard</Link></li> : 
                <> 
                <li><Link to="/signuporg">For Organizations</Link></li>
                <li><Link to="/signup">For Volunteers</Link></li>
                </>}
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <Link 
              to="/" 
              className="btn btn-ghost text-xl transition duration-300 ease-in-out 
              hover:bg-purple-950 text-white hover:shadow-md border-none"
            >
              GoodDeeds
            </Link>
        </div>
        <div className="navbar-end">

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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                  <li>
                      <a className="justify-between">
                          Profile
                      </a>
                  </li>
                  <li onClick={handleLogOut}><a>Logout</a></li>
              </ul>
          </div>
      </div>
        :
        <button className="btn btn-ghost btn-circle text-xl transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md border-none">
            <Link to="/login">
                <i class="fa-solid fa-arrow-right-to-bracket"></i>
            </Link>
        </button>}

        </div>
      </div>
      
        <div className="navbar bg-[#664395] shadow-sm gap-3 justify-between items-center text-white hidden lg:flex">
              <div>
                <Link 
                  to="/" 
                  className="btn border-none shadow-none bg-[#664395] text-xl text-white hover:bg-purple-950"
                >
                  GoodDeeds
                </Link>
              </div>
              <div className="flex gap-4">
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/listing">Events</Link></button>
                {isLoggedIn ? 
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/dashboard">Dashboard</Link></button> 
                :
                <>
                < button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/signuporg">For Organizations</Link></button>
                <button className="border-0 btn btn-ghost transition duration-300 ease-in-out hover:bg-purple-950 hover: text-white hover:shadow-md"><Link to="/signup">For Volunteers</Link></button>
                </>}
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-black">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li onClick={handleLogOut}><a>Logout</a></li>
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
