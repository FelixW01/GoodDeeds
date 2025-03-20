import { Link } from "react-router-dom";

function Error() {

    return (
      <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}>
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">404 Not found!</h1>
          <p className="mb-5">
            The page you're looking for does not exist!
          </p>
          <Link to="/"><button className="btn btn-primary">Back to home</button></Link>
        </div>
      </div>
    </div>
    )
}

export default Error