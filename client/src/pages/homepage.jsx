import Hero from "../components/Hero";
import ImageCard from "../components/ImageCard.jsx";
import ImageCardReverse from "../components/ImageCardReverse.jsx";
import DualImageCard from "../components/DualImageCard.jsx";
import DualInfoCard from "../components/DualInfoCard.jsx";
import ContactForm from "../components/ContactForm.jsx";
import Accordion from "../components/Accordion.jsx";

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
            <div className='flex justify-center mb-0 lg:mb-10'>
                <ImageCardReverse/>
            </div>
            <DualInfoCard/>
            <div className='flex justify-center'>
            <ContactForm/>
            </div>
            <h1 className='font-bold text-3xl lg:text-5xl text-center my-10'>Frequently Asked Questions</h1>
            <div className='flex justify-center'>
            <Accordion/>
            </div>
        </>
    )
}

export default HomePage
