import { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUpOrgCard() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    organizationName: '',
    contactEmail: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="hero bg-base-200 min-h-[70vh] max-w-[80%] bg-[url('/img/volunteer-login.png')] bg-cover bg-center backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left relative z-10">
            <div className="bg-black bg-opacity-55 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h1 className="lg:text-5xl font-bold text-white text-4xl">
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
                        name="firstName"
                        className="input"
                        placeholder="First Name"
                        required
                        minLength="2"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Last name</legend>
                      <input
                        type="text"
                        name="lastName"
                        className="input"
                        placeholder="Last Name"
                        required
                        minLength="2"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Email</legend>
                      <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Password</legend>
                      <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        required
                        minLength="6"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Organization Name</legend>
                      <input
                        type="text"
                        name="organizationName"
                        className="input"
                        placeholder="Organization Name"
                        required
                        minLength="3"
                        value={formData.organizationName}
                        onChange={handleChange}
                      />
                      <legend className="fieldset-legend">Contact Email</legend>
                      <input
                        type="email"
                        name="contactEmail"
                        className="input"
                        placeholder="Contact Email"
                        required
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        value={formData.contactEmail}
                        onChange={handleChange}
                      />   
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
