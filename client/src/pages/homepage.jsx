import Hero from "../components/Hero";
import ImageCard from "../components/ImageCard.jsx";
import ImageCardReverse from "../components/ImageCardReverse.jsx";
import DualImageCard from "../components/DualImageCard.jsx";

function HomePage() {

    return (
        <>
            <Hero/>
            <h1 className='font-bold text-3xl lg:text-5xl text-center mt-10'>Our Story</h1>
            <div className='flex justify-center mt-10'>
            <ImageCard/>
            </div>
            <div className='flex justify-center'>
            <DualImageCard/>
            </div>
            <div className='flex justify-center mb-10'>
                <ImageCardReverse/>
            </div>
            <div className='border-b-2 border-gray-100'></div>
        </>
    )
}

export default HomePage
