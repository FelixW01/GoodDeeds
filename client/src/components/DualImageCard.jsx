const DualImageCard = () => {
    return (
        <>
            <div className="card xl:card-side p-10 bg-[#5F477E] shadow-sm lg:mx-4 lg:my-4 w-full lg:w-8/12 justify-evenly rounded-none lg:rounded-lg">
                <img
                    src="/img/volunteer2.png"
                    alt="Album"
                    className='mb-4 xl:mb-0 xl:w-5/12 h-auto rounded-lg'
                />
                <img
                    src="/img/volunteer3.png"
                    alt="Album"
                    className='xl:w-5/12 h-auto rounded-lg'
                />
            </div>
        </>
    )
}

export default DualImageCard;