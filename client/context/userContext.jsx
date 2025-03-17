import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
  const [error, setError] = useState(null);

  function capitalize(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
  
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = (hours % 12) || 12;
    const ampm = hours < 12 ? "AM" : "PM";
  return `${formattedHours}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    getMe();
    user ? console.log('User:', user): null;
  },[])

  const getMe = async () => {
    try {
      const response = await axios.get('/api/user/profile');
      setUser (response.data);
    } catch (error) {
      console.error('Get me failed:', error);
    }
  }

  const login = async (userData) => {
      const response = await axios.post('/api/login', userData);
      await getMe(); 
      setError(null);
      toast.success(`Welcome, ${capitalize(response.data.first_name)} ${capitalize(response.data.last_name)} `)
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      setUser (null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, capitalize, formatTime, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };