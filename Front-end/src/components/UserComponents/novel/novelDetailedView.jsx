import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { payToReadPageUrl, chatPageUrl, readerHome } from '../../../util/constants';
import Comments from '../../Comments/comments';
import toast from 'react-hot-toast';
import { RatingPostAPI, addNovelToLibraryAPI, getNovelDetailsWithIdAPI } from '../../../APIs/userAPI';
import { Tooltip } from '@mui/material';
import Loading from '../../loading'

//.............................................................................
//formate Large Numbers
const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num.toString();
    }
};

const NumberFormatter = ({ value }) => {
    const formattedValue = formatNumber(value);

    return <span>{formattedValue}</span>;
};

//.............................................................................


export default function NovelDetailedView() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [novel, setNovel] = useState([]);
    const [rate, setRate] = useState(0);
    const [inLibrary, setInLibrary] = useState(false);

    //.........................................................................

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const NovelId = queryParams.get('NovelId');

        if (!NovelId) {

            navigate(-1)

        } else {
            getNovelWithId(NovelId);
        }
    }, [])

    //.........................................................................

    const getNovelWithId = async (novelId) => {
        try {

            const response = await getNovelDetailsWithIdAPI(novelId);
            if (response.data.status) {

                setNovel([response.data.novel]);
                setRate([response.data.novel.rate]);
                // setInLibrary(response.data.inLibrary)

            } else {
                navigate(readerHome)
                toast.error('not found');
            }


        } catch (error) {
            console.log('catch error in ::getNovelWithId - ' + error.message)
            toast.error(error.message);
            navigate(readerHome)
        }
    }

    //.........................................................................

    const handleChapterClick = (novelId, chapterNo) => {
        if (novel[0].chapters.length <= 0) {
            toast.success('No Chapters', { icon: '😿❌' })
        } else {
            navigate(`${payToReadPageUrl}?NovelId=${novelId}&ChapterNo=${chapterNo}`)
            // navigate(`${readNovel}?NovelId=${novelId}&number=${number}`)
        }
    }

    //.........................................................................

    const giveRating = async (rate, novelId) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user-login')).id

            const body = JSON.stringify({
                rate,
                userId,
                novelId
            })

            const response = await RatingPostAPI(body);

            if (response.data.status) {

                toast.success(response.data.message)
                setRate(rate)

            } else {

                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }

    }

    //.........................................................................

    const addToLibrary = async (novelId) => {
        try {

            const response = await addNovelToLibraryAPI(novelId);

            if (response.data.status) {
                if (response.data.message === 'Novel added to library') {
                    toast.success('Novel added to library', {
                        position: "bottom-right",
                        style: {
                            borderRadius: '17px',
                        }
                    });

                    setInLibrary(true)

                } else {
                    toast(response.data.message, {
                        icon: '📤',
                        position: "bottom-right",
                        style: {
                            borderRadius: '17px',
                        }
                    });

                    setInLibrary(false)
                }

            } else {

                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    //.........................................................................

    const handleCommunityButton = async (novelId) => {
        navigate(`${chatPageUrl}?novelId=${novelId}`);
    }

    //.........................................................................


    return (

        <>
            {

                novel.length === 0 ?
                    <>

                        <Loading />

                    </> :

                    novel.map((item) => (



                        < div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-gray-600 via-gray-700 to-gray-800 m-1 p-2' key={item._id}>

                            {/*--------------------- NOVEL DETAILS -----------------*/}
                            <div className='m-3 p-1 md:flex-row flex flex-col gap-5'>

                                <div className='md:w-4/6 md:flex-row flex flex-col gap-5'>

                                    {/* ------------ NOVEL COVER DIV ------------- */}
                                    <div className='md:w-2/6 h-full flex justify-center items-center'>

                                        <div className='h-80 w-60 bg-black rounded-lg text-white
                        drop-shadow-lg hover:border-4 border-blue-500 hover:rotate-2 duration-200 BANNER_PHOTO'
                                            style={{
                                                backgroundImage: `url(${item.cover})`,
                                                backgroundSize: 'cover'
                                            }}></div>

                                    </div>
                                    {/* ------------ NOVEL COVER DIV END ------------- */}

                                    {/* ------------ NOVEL NAME AND DESCRIPTION ------------- */}
                                    <div className='md:w-4/6 h-full flex flex-col justify-center'>
                                        <h1 className='text-white poppins2 text-3xl'>{item.title}</h1>
                                        <p className='text-blue-400 font-mono tracking-widest'>{item.status}</p>

                                        {/* READ NOW AND ADD TO LIBRARY BUTTONS */}
                                        <div className='md:w-3/4 flex gap-2 mt-3 w-full'>

                                            <button className='bg-blue-500 hover:bg-gray-500 poppins2 p-1.5
                                    text-white rounded-md pr-2 font-sans w-full drop-shadow-lg'
                                                onClick={() => handleChapterClick(item._id, item.chapters[0].number)}>
                                                Read Now
                                                <i className="fa-solid fa-caret-right m-1.5"></i>
                                            </button>

                                            <button className='bg-gray-700 hover:bg-blue-700 poppins2 p-1.5
                                   text-white rounded-md pr-2 font-sans w-full drop-shadow-lg'
                                                onClick={() => addToLibrary(item._id)}>
                                                {!inLibrary ?
                                                    <p className='md:text-base text-sm'>
                                                        Add To Library<i className="fa-solid fa-circle-plus m-1.5"></i>
                                                    </p>
                                                    :
                                                    <p className='md:text-base text-sm'>
                                                        remove Library <i className="fa-solid fa-circle-minus m-1.5"></i>
                                                    </p>
                                                }

                                            </button>

                                        </div>
                                        {/* READ NOW AND ADD TO LIBRARY BUTTONS END*/}


                                        {/* NOVEL VIEWS AND LIBRARY COUNT */}
                                        <div className='md:w-3/4 flex md:gap-5 gap-4 md:ml-4 mt-3 select-none text-sm'>

                                            <small className='text-gray-300'>
                                                Views <NumberFormatter value={item.views} /> <i className="fa-solid fa-eye"></i>
                                            </small>

                                            <small className='text-gray-300'>|</small>

                                            <small className='text-gray-300'>
                                                in <NumberFormatter value={item.in_library} />
                                                Library <i className="fa-solid fa-book-bookmark"></i>
                                            </small>

                                            <small className='text-gray-300'>|</small>

                                            <Tooltip title="Official Community " placement="bottom">

                                                <p className='text-blue-100 font-mono font-bold cursor-pointer 
                                                hover:tracking-widest duration-500 md:text-sm text-xs'
                                                    onClick={() => handleCommunityButton(item._id)}>
                                                    community <i className="fa-solid fa-arrow-right"></i>
                                                </p>

                                            </Tooltip>
                                        </div>
                                        {/* NOVEL VIEWS AND LIBRARY COUNT END*/}


                                        {/* NOVEL DESCRIPTION */}
                                        <div className='w-full text-gray-200 overflow-hidden mt-3 p-1 md:text-base text-xs '>

                                            <p> {item.description} </p>

                                        </div>
                                        {/* NOVEL DESCRIPTION END*/}

                                    </div>
                                    {/* ------------ NOVEL NAME AND DESCRIPTION END------------- */}

                                </div>

                                {/* ------------ NOVEL REVIEW AND DETAILS ------------- */}
                                <div className='md:w-2/6 flex flex-col md:pl-12 justify-center
                                    text-white text-left font-mono'>
                                    <p><b className='font-sans'>Author:</b> {item.author_id.userName}</p>
                                    <p><b className='font-sans'>Publish Date:</b> {new Date(item.publish_date).toLocaleDateString("en-GB")}</p>
                                    <p><b className='font-sans'>Genres:</b> {
                                        item.genre.map((genres) => (
                                            genres.name + ', '
                                        ))
                                    }</p>

                                    {/* RATING SYSTEM */}
                                    <div className="flex items-center ">
                                        <div className='bg-gray-800 flex p-3 md:pl-6 md:pr-6 mt-3 rounded-lg'>
                                            <p className="ms-1 mr-1.5 text-md font-medium text-gray-500 dark:text-gray-400">
                                                {rate} out of 5
                                            </p>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 1 ? "currentColor" : 'gray'} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                    onClick={() => giveRating(1, item._id)} />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 2 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                    onClick={() => giveRating(2, item._id)} />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 3 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                    onClick={() => giveRating(3, item._id)} />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 4 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                    onClick={() => giveRating(4, item._id)} />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 5 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                    onClick={() => giveRating(5, item._id)} />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* RATING SYSTEM END*/}

                                </div>
                                {/* ------------ NOVEL REVIEW AND DETAILS END ------------- */}

                            </div>
                            {/*--------------------- NOVEL DETAILS END-----------------*/}

                            {/* -----------------------NOVEL CHAPTERS-------------------- */}
                            <div className='w-full max-h-96 flex flex-col-reverse gap-3 p-5 mt-10 overflow-y-scroll scroll'>

                                {
                                    item.chapters?.length > 0 ?
                                        item.chapters.map((chapter) => (

                                            <div className={`hover:bg-gray-500 ${chapter.gcoin > 0 ? "bg-gray-900" : 'bg-gray-600'}
                                     w-full rounded-lg  p-2 pl-5 pr-5 grid grid-cols-3 lg:grid-cols-4 font-medium
                                      poppins2 ${chapter.gcoin > 0 ? "text-white" : 'text-gray-400'} hover:text-white gap-5
                                       hover:font-mono select-none cursor-pointer`}
                                                onClick={() => handleChapterClick(item._id, chapter.number)} key={chapter._id}>

                                                <p className='text-left text-xs lg:text-lg lg:col-span-2'>
                                                    chapter {chapter.number}: {chapter.title}</p>

                                                {
                                                    <p className='text-center text-xs lg:text-lg'>{chapter.gcoin ?
                                                        `${chapter.gcoin} Gcoin to unlock` : ''}</p>
                                                }

                                                <p className='text-right text-xs lg:text-lg'>
                                                    {new Date(chapter.publish_date).toLocaleDateString("en-GB")}
                                                </p>

                                            </div>

                                        )) : <p className='text-white text-center bg-blue-500 p-2 
                                            rounded font-mono'>There is No Chapters</p>
                                }


                                {item.scheduled &&

                                    < div className='bg-gray-900 w-full rounded-lg  p-2 pl-5 pr-5 grid grid-cols-3
                                     lg:grid-cols-4 font-medium poppins2 text-gray-400 gap-5 hover:font-mono
                                        select-none cursor-not-allowed'>

                                        <p className='text-left text-xs lg:text-lg lg:col-span-2'>
                                            {item.scheduled}
                                        </p>
                                    </div>
                                }

                            </div>
                            {/* -----------------------NOVEL CHAPTERS END-------------------- */}


                            < div className='bg-gray-700 p-5 mt-10 rounded-xl text-white text-2xl font-mono' >
                                <Comments novelId={item._id} />
                            </div >

                        </div >


                    ))

            }

        </>
    )
}

//.........................................................................
