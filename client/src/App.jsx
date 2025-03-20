import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage';
import DashboardPage from './pages/dashboardpage';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import ListingPage from './pages/listingpage';
import ProfilePage from './pages/profilepage';
import Layout from "./pages/layout.jsx"
import Error from './pages/error';
import { UserProvider } from '../context/userContext';

function App() {

  return (
  <UserProvider>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/dashboard" element={<DashboardPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/signuporg" element={<SignUpPage />}/>
            <Route path="/listing" element={<ListingPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="*" element={<Error />}/>
          </Route>
      </Routes>
    </BrowserRouter>
  </UserProvider>
  )
}

export default App
