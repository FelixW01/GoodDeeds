import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUpCard() {
  const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    });
  
  const [error, setError] = useState(null);

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
      const response = await axios.post('/api/user/create', formData);
      console.log('User created:', response.data);
    } catch (err) {
      console.error('Error creating user:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="hero bg-base-200 min-h-[70vh] max-w-[80%] bg-[url('/img/volunteer-login.png')] bg-cover bg-center backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left relative z-10">
            <div className="bg-black bg-opacity-55 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-bold text-white">
                Become a member today!
              </h1>
              <p className="py-6 text-lg text-white">
                Making the world a better place for everybody, one good deed at a time!
              </p>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <>
                      <legend className="fieldset-legend">First name</legend>
                      <input
                        type="text"
                        name="first_name"
                        className="input"
                        placeholder="First Name"
                        required
                        minLength="2"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Last name</legend>
                      <input
                        type="text"
                        name="last_name"
                        className="input"
                        placeholder="Last Name"
                        required
                        minLength="2"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Email</legend>
                      <label className=" input validator">
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
                      <label className="input validator">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                        <input type="password" 
                        required 
                        placeholder="Password" 
                        minLength="8" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        />
                      </label>
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                      <button className="btn bg-[#7539C2] text-white mt-4">Sign Up</button>
                    </>
                  <div>
                    Registering as an <strong>organization?</strong>
                      {' '}
                    <Link to="/signuporg" className="text-[#7539C2]">Click here!</Link>
                  </div>
                  <div>
                    Already have an account?
                      {' '}
                    <Link to="/login" className="text-[#7539C2]">Sign in</Link>
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

export default SignUpCard
