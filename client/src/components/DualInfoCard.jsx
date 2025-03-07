import { Link } from 'react-router-dom';

const dualInfoCard = () => {
    return (
        <>
            <div className='flex flex-col xl:flex-row justify-center'>
                <div className=' w-full h-fit xl:w-4/12 bg-gray-100 xl:rounded-l-lg p-10'>
                    <div className='flex flex-col gap-4 mb-12'>
                        <h2 className='font-bold'>Want to volunteer?</h2>
                        <h1 className='text-4xl font-bold'>Why volunteers love us</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-[#5F477E] rounded-full'></div>
                            <p>Gain new skills and experiences</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-[#5F477E] rounded-full'></div>
                            <p>Meet new people and build meaningful relationships</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-[#5F477E] rounded-full'></div>
                            <p>Make a positive impact in your community</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-[#5F477E] rounded-full'></div>
                            <p>Improve your mental and physical health</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-12'>
                        <Link to="/signup">
                            <button className='btn bg-[#5F477E] text-white hover:bg-[#7539C2]'>Sign Up</button>
                        </Link>
                    </div>
                </div>
                <div className='h-fit w-full xl:w-4/12 bg-[#5F477E] xl:rounded-r-lg p-10 text-white'>
                    <div className='flex flex-col gap-4 mb-12'>
                        <h2 className='font-bold'>Need volunteers?</h2>
                        <h1 className='text-4xl font-bold'>Why organizations love us</h1>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-gray-100 rounded-full'></div>
                            <p>Find qualified and passionate volunteers</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-gray-100 rounded-full'></div>
                            <p>Streamline your volunteer management process</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-gray-100 rounded-full'></div>
                            <p>Enhance your organization's reputation and visibility</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='w-4 h-4 bg-gray-100 rounded-full'></div>
                            <p>Improve your organization's social impact</p>
                        </div>
                    </div>
                    <div className='flex justify-end mt-12'>
                        <Link to="/signup">
                            <button className='btn'>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default dualInfoCard;