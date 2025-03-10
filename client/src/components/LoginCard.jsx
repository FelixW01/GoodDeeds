import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function LoginCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  function capitalize(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setError(null);

    try {
      const response = await axios.post('/api/login', formData);
      console.log('Successfully logged in:', response.data);
      toast.success(`Welcome, ${capitalize(response.data.first_name)} ${capitalize(response.data.last_name)} `)
    } catch (err) {
      console.error('Error creating organization account:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="hero bg-base-200 min-h-[70vh] max-w-[80%] bg-[url('/img/volunteer-login.png')] bg-cover bg-center backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left relative z-10">
            <div className="bg-black bg-opacity-55 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-bold text-white">Login now!</h1>
              <p className="py-6 text-lg text-white">
                Making the world a better place for everybody, one good deed at a time!
              </p>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                 <legend className="fieldset-legend">Email</legend>
                  <label className=" input">
                      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                        <input
                        type="email"
                        name="email"
                        placeholder="Email@gmail.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                  </label>
                      <div className="validator-hint hidden">Enter valid email address</div>

                  
                  <legend className="fieldset-legend">Password</legend>
                    <label className="input">
                      <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input type="password" 
                        required 
                        placeholder="Password" 
                        minLength="8" 
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                      />
                    </label>

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  <button className="btn bg-[#7539C2] text-white mt-4">Login</button>
                  <div>
                    Don't have an account?
                      {' '}
                    <Link to="/signup" className="text-[#7539C2]">Register</Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginCard;
