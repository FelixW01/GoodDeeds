const DualImageCard = () => {
    return (
        <>
            <div className="card xl:card-side p-10 bg-base-100 shadow-sm lg:mx-4 lg:my-4 w-full lg:w-8/12 bg-gray-100 justify-evenly">
                <img
                    src="/img/volunteer2.png"
                    alt="Album"
                    className='mb-4 xl:mb-0 xl:w-5/12 h-auto'
                />
                <img
                    src="/img/volunteer3.png"
                    alt="Album"
                    className='xl:w-5/12 h-auto'
                />
            </div>
        </>
    )
}

export default DualImageCard;