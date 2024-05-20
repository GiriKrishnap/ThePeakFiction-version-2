import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addNovelToLibraryAPI, getRandomNovelAPI } from '../../../APIs/userAPI';
import { novelDetailedView } from '../../../util/constants';
import toast from 'react-hot-toast';
//.........................................................................


export default function Banner() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [novel, setNovel] = useState([]);
    const [loading, setLoading] = useState(true);

    //.........................................................................

    useEffect(() => {
        changeBanner()
    }, [])

    //.........................................................................

    const changeBanner = async () => {
        try {

            const response = await getRandomNovelAPI();
            if (response.data.status) {
                setNovel(response.data.random[0])
                setLoading(false);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${novelDetailedView}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................

    const addToLibrary = async (novelId) => {
        try {

            const response = await addNovelToLibraryAPI(novelId);

            if (response.data.status) {

                toast.success(response.data.message);

            } else {

                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    //.........................................................................


    return (
        <>{

            <div className={`md:h-72 ${loading && "animate-pulse"} h-56 m-2 rounded-lg grid md:grid-cols-3 grid-cols-2 
            overflow-hidden`}
                style={novel?._id ? { backgroundImage: `url(${novel?.cover})`, backgroundSize: 'cover' } : {}}>
                {/* //////////////// */}
                <div className=' pl-5 flex flex-col place-items-start text-left bg-gradient-to-r
                 from-gray-800 from-50% to-transparent to-95% rounded-lg p-4'>

                    <p className={`${novel?.title?.length < 15 ? "md:text-7xl" : 'md:text-6xl'} text-4xl m-1 
                     md:mt-8 mt-8 font-medium bold-text text-white drop-shadow-md hover:animate-pulse duration-1000 `}>
                        {novel?.title ? novel?.title : 'loading... :)'}
                    </p>

                    <p className='text-gray-200 mt-3 italic md:h-36 h-full overflow-hidden 
                    poppins drop-shadow-lg hidden lg:block w-full'>
                        {novel?.description}
                    </p>

                    {
                        !loading &&
                        <div className='flex mt-3 md:hidden '>
                            <button className=' bg-red-500 h-8 text-center w-20 rounded-lg text-white 
                        font-medium mr-2 drop-shadow-lg hover:scale-105 hover:bg-red-600 duration-500'
                                onClick={() => handleClick(novel?._id)}>Read</button>


                            <button className=' bg-blue-500 h-8 w-20 rounded-lg
                              text-white font-medium drop-shadow-lg hover:scale-105
                              text-sm hover:bg-blue-600 duration-500'
                                onClick={() => addToLibrary(novel?._id)}>+library</button>
                        </div>
                    }

                </div>

                {/* //////////////// */}

                {
                    novel?.length > 0 ?
                        <div
                            style={{ backgroundImage: `url(${novel?.cover})`, backgroundSize: 'cover' }}
                            className='md:h-64 h-44 m-4 rounded-lg drop-shadow-2xl -rotate-6 bg-black md:w-44
                        hover:rotate-0 hover:scale-95 duration-500 md:ml-36 BANNER_PHOTO' ></div> : ''
                }

                {/* //////////////// */}
                <div className='p-10 hidden lg:block mt-10 '>

                    <p className='flex text-red-400 poppins drop-shadow-lg font-bold text-2xl tracking-wider'>Author: {novel?.author?.userName} </p>
                    <p className='flex text-blue-100 poppins drop-shadow-md font-bold text-2xl tracking-wider'>Publish Date: {new Date(novel?.publish_date).toLocaleDateString("en-GB")}</p>
                    <p className='flex text-blue-100 poppins drop-shadow-md font-bold text-2xl tracking-wider'>Rating: {novel?.rate}</p>

                    <br />

                    {/* ..............BUTTONS.............. */}
                    {
                        !loading &&
                        <div className='flex mt-3'>
                            <button className=' bg-red-500 h-10 p-2 w-52 rounded-full text-white 
                                    font-medium mr-2 drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-red-600 
                                    duration-500' onClick={() => handleClick(novel?._id)}>
                                <i className="fa-solid fa-book-open"></i> Read Now
                            </button>

                            <button className=' bg-blue-500 h-10 p-2 w-52 rounded-full
                                text-white font-medium drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-blue-600 
                                duration-500'
                                onClick={() => addToLibrary(novel?._id)}>
                                <i className="fa-solid fa-circle-plus"></i> Add to library
                            </button>

                            <i className="fa-solid fa-retweet text-white fa-xl mt-5 cursor-pointer m-2"
                                onClick={changeBanner}></i>
                        </div>
                    }
                    {/* ..............BUTTONS END.............. */}

                </div>

            </div >

        }
        </>
    )
}
//.........................................................................
