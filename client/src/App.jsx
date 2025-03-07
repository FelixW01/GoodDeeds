import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage';
import DashboardPage from './pages/dashboardpage';
import CreateListPage from './pages/createlistingpage';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import ListingPage from './pages/listingpage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/dashboard" element={<DashboardPage />}/>
          <Route path="/createlist" element={<CreateListPage />}/>
          <Route path="/loginpage" element={<LoginPage />}/>
          <Route path="/signuppage" element={<SignUpPage />}/>
          <Route path="/listingpage" element={<ListingPage />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
