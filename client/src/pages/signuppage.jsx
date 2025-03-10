import { Link } from 'react-router-dom';

function SignUpPage() {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <div className="hero bg-base-200 min-h-[70vh] max-w-[80%] bg-[url('/img/volunteer-login.png')] bg-cover bg-center backdrop-blur-sm">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left relative z-10">
            <div className="bg-black bg-opacity-55 backdrop-blur-sm p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-bold text-white">Register now!</h1>
              <p className="py-6 text-lg text-white">
                Making the world a better place for everybody, one good deed at a time!
              </p>
            </div>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                  <label className="fieldset-label">Email</label>
                  <input type="email" className="input" placeholder="Email" />
                  <label className="fieldset-label">Password</label>
                  <input type="password" className="input" placeholder="Password" />
                  <button className="btn bg-[#7539C2] text-white mt-4">Sign Up</button>
                  <div>
                    Have an account?
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

export default SignUpPage
