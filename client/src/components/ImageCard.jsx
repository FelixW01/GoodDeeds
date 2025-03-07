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
                    <p className='lg:text-lg'> GoodDeeds is a volunteer opportunity platform that connects individuals with organizations and
                        causes they care about. Our mission is to make volunteering easy, accessible, and rewarding for
                        everyone. We believe that volunteering is a powerful way to build stronger, more connected
                        communities, and we're committed to providing a platform that makes it easy for people to get
                        involved. Whether you're looking to volunteer your time, skills, or resources, GoodDeeds is here
                        to help you make a difference. Our platform allows you to search for volunteer opportunities
                        that match your interests and availability, and to connect with organizations and causes that
                        align with your values. We also provide tools and resources to help you track your volunteer
                        hours, share your experiences with others, and connect with like-minded individuals. At
                        GoodDeeds, we're passionate about creating a community of volunteers who are dedicated to making
                        a positive impact in the world. We believe that everyone has the power to make a difference, and
                        we're committed to providing the tools and resources you need to get started.</p>
                </div>
            </div>
        </>
    )
}

export default ImageCard;