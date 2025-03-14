import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function SignUpOrgCard() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    name: '',
    contact_email: '',
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    for (let field of ['email', 'contact_email']) {
    if (!formData[field]) {
      setError(`Please input your ${field.replace('_', ' ')}!`);
      return;
    }
    if (!emailPattern.test(formData[field])) {
      setError(`Invalid ${field.replace('_', ' ')}: ${formData[field]}`);
      return;
     }
    }

    try {
      const response = await axios.post('/api/events/create', formData);
      console.log('Event created:', response.data);

      toast.success('Eventcreated successfully!');

    } catch (err) {
      console.error('Error creating organization account:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error('Error creating user')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="hero bg-base-200 min-h-screen lg:min-h-[80vh] lg:max-w-[80%] bg-[url('/img/volunteer-login.png')] bg-cover bg-center backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left relative z-10">
            <div className="bg-black bg-opacity-55 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl lg:text-5xl md:text-4xl font-bold text-white">
                Register your organization today!
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
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="Email@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input ${error ? 'border-error' : formData.email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) ? 'border-success' : ''}`}
                        />

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
                      <p className="validator-hint hidden">
                        Must be more than 8 characters, including
                        <br/>At least one number
                        <br/>At least one lowercase letter
                        <br/>At least one uppercase letter
                      </p>

                      <legend className="fieldset-legend">Organization Name</legend>
                      <input
                        type="text"
                        name="name"
                        className="input"
                        placeholder="Organization Name"
                        required
                        minLength="3"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Contact Email</legend>
                        <input
                        type="email"
                        name="contact_email"
                        placeholder="GoodDeeds@gmail.com"
                        required
                        value={formData.contact_email}
                        onChange={handleChange}
                        className={`input ${error ? 'border-error' : formData.contact_email && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.contact_email) ? 'border-success' : ''}`}
                      />
                      {error && <p className="text-red-500 mt-2">{error}</p>}
                      <button className="btn bg-[#7539C2] text-white mt-4">Sign Up</button>
                  <div>
                    Registering as a <strong>volunteer?</strong>
                      {' '}
                    <Link to="/signup" className="text-[#7539C2]">Click here!</Link>
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

export default SignUpOrgCard
