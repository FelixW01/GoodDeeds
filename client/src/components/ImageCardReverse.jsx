const ImageCardReverse = () => {
    return (
        <>
            <div className="card xl:card-side bg-white shadow-sm lg:mx-4 lg:my-4 lg:w-8/12 xl:bg-gray-100">
                <div className="card-body">
                    <h2 className="card-title lg:text-2xl">Benefits of Volunteering with GoodDeeds</h2>
                    <div className="mb-6">
                        <p className='lg:text-lg'>Volunteering with GoodDeeds can have a profound impact on your life and the lives of others.
                            Here are just a few of the benefits you can expect:</p>
                        <div className="list-disc pl-4 lg:text-lg">
                            <div className="mb-2">
                                <li>Gain new skills and experiences that can enhance your career and personal life</li>
                            </div>
                            <div className="mb-2">
                                <li>Meet new people and build meaningful relationships with like-minded individuals</li>
                            </div>
                            <div className="mb-2">
                                <li>Make a positive impact in your community and contribute to a cause you care about
                                </li>
                            </div>
                            <div className="mb-2">
                                <li>Improve your mental and physical health through the act of volunteering</li>
                            </div>
                            <div className="mb-2">
                                <li>Enhance your resume and job prospects with volunteer experience</li>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    src="/img/volunteer4.png"
                    alt="Album"
                    className='xl:rounded-r-lg rounded-b-lg'/>
            </div>
        </>
    )
}

export default ImageCardReverse;