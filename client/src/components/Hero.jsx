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
                    <h1 className="mb-5 text-5xl font-bold">Welcome to GoodDeeds</h1>
                    <p className="mb-5 lg:text-lg">
                        Where we make the world a better place for everybody, one good deed at a time!
                    </p>
                    <Link to="/listing">
                        <button className='btn hover:bg-[#5F477E] bg-[#7539C2] text-white border-none shadow-none'>
                        Explore Opportunities
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;