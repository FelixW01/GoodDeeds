import '../App.css'
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Toaster } from 'react-hot-toast';

// adds navbar and footer to all pages, outlet is the content of all the other pages
const Layout = () => {
    return (
        <>
            <Navbar/>
            <Toaster position="bottom-center" toastOptions={{duration: 2000}}/>
                <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout;