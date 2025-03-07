const ImageCard = () => {
    return (
        <>
            <div className="card xl:card-side bg-base-100 shadow-sm lg:mx-4 lg:my-4 lg:w-8/12 xl:bg-gray-100">
                <img
                    src="/img/volunteer1.png"
                    alt="Album"
                    className='xl:rounded-l-lg rounded-t-lg'/>
                <div className="card-body">
                    <h2 className="card-title lg:text-2xl">What is GoodDeeds?</h2>
                    <p className='lg:text-lg'>GoodDeeds is a volunteer opportunity platform that connects individuals with organizations and causes they care about. Our mission is to make volunteering easy, accessible, and rewarding for everyone.</p>
                    <div className='list-disc pl-4 lg:text-lg'>
                        <div className='mb-2'>
                            <li>Search for volunteer opportunities that match your interests and availability</li>
                        </div>
                        <div className='mb-2'>
                            <li>Connect with organizations and causes that align with your values</li>
                        </div>
                        <div className='mb-2'>
                            <li>Track your volunteer hours and share your experiences with others</li>
                        </div>
                        <div className='mb-2'>
                            <li>Connect with like-minded individuals and make a positive impact in your community</li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageCard;