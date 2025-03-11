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

  useEffect(() => {
    getMe();
  },[])

  const getMe = async () => {
    try {
      const response = await axios.get('/api/me');
      setUser (response.data);
    } catch (error) {
      console.error('Get me failed:', error);
    }
  }

  const login = async (userData) => {
    try {
      const response = await axios.post('/api/login', userData);
      setUser (response.data);
      setError(null);
      toast.success(`Welcome, ${capitalize(response.data.first_name)} ${capitalize(response.data.last_name)} `)
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
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
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };