import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(/img/hero.png)",
            }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-white text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <Link to="/listing">
                        <button className='btn btn-primary'>
                        Explore Opportunities
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;