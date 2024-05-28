import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { authorAddChapter, authorEditChapter, authorEditNovel } from '../../util/constants';
import { cancelNovelAPI, deleteChapterAPI, getNovelDetailsWithIdAPI } from '../../APIs/userAPI';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '../loading'

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


export default function NovelDetailAuthor() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [novel, setNovel] = useState([]);
    const [rate, setRate] = useState(0);
    const [chapterNumber, setChapterNumber] = useState('');

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
                setChapterNumber(response.data.novel.chapters.length + 1)
            }


        } catch (error) {
            console.log('catch error in ::getNovelWithId - ' + error.message)
        }
    }

    //.........................................................................

    const handleAddChapter = async (id) => {

        if (novel[0].status === "pending") {
            toast.error("Didn't get the admin's Approval", {
                icon: '😿❌', style: {
                    borderRadius: '30px',
                },
            })


        } else if (novel[0].status === "cancelled") {
            toast.error("You Cancelled This Novel", {
                icon: '😿❌', style: {
                    borderRadius: '30px',
                },
            })
        } else {

            navigate(`${authorAddChapter}?NovelId=${id}&number=${chapterNumber}`,
                { replace: true })

        }
    }

    //.........................................................................

    const handleCancelButton = async (novelId) => {
        try {
            Swal.fire({
                title: 'Cancel your Novel?',
                text: "Do you want to Cancel?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await cancelNovelAPI(novelId);
                    if (response.data.status) {
                        toast.success(response.data.message);
                        getNovelWithId(novelId);
                    }
                }
            })
        } catch (error) {
            console.log('catch error on handleCancelButton', error);
        }
    }

    //.........................................................................

    const handleDeleteChapter = async (novelId, chapterId) => {
        try {

            Swal.fire({
                title: 'Delete This Chapter?',
                text: "Do you want to Delete?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const body = {
                        novelId,
                        chapterId
                    }
                    const response = await deleteChapterAPI(body);
                    if (response.data.status) {
                        toast.success(response.data.message);
                        getNovelWithId(novelId);
                    }
                }
            })
        } catch (error) {
            console.log('catch error on handleCancelButton', error);
        }
    }


    //.........................................................................

    const handleEditChapter = async (novelId, chapterId) => {
        try {

            Swal.fire({
                title: 'Edit This Chapter?',
                text: "Do you want to Edit?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    navigate(`${authorEditChapter}?novelId=${novelId}&chapterId=${chapterId}`);
                }
            })
        } catch (error) {
            console.log('catch error on handleCancelButton', error);
        }
    }


    //.........................................................................

    const handleEditButton = (novelId) => {
        Swal.fire({
            title: 'Edit This Novel?',
            text: "Do you want to Edit?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {

                navigate(`${authorEditNovel}?novelId=${novelId}`);
            }
        })
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



                        <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                                  from-gray-600 via-gray-700 to-gray-800 m-1 p-2' key={item._id}>

                            {/*--------------------- NOVEL DETAILS -----------------*/}
                            <div className='m-3 p-1 sm:flex-row flex flex-col gap-5'>

                                <div className='sm:w-4/6 sm:flex-row flex flex-col gap-5'>

                                    {/* ------------ NOVEL COVER DIV ------------- */}
                                    <div className='sm:w-2/6 h-full flex justify-center items-center'>

                                        <div className='h-80 w-60 bg-black rounded-lg text-white
                                      drop-shadow-lg hover:border-4 border-blue-600 hover:rotate-2 duration-200'
                                            style={{
                                                backgroundImage: `url(${item.cover})`,
                                                backgroundSize: 'cover'
                                            }}></div>

                                    </div>
                                    {/* ------------ NOVEL COVER DIV END ------------- */}

                                    {/* ------------ NOVEL NAME AND DESCRIPTION ------------- */}
                                    <div className='sm:w-4/6 h-full flex flex-col justify-center'>
                                        <h1 className='text-white poppins2 text-3xl'>{item.title}</h1>
                                        <p className='text-blue-400 font-mono tracking-widest'>{item.status}</p>

                                        {/* READ NOW AND ADD TO LIBRARY BUTTONS */}
                                        {
                                            item.status !== "cancelled" && item.status !== "rejected" ?
                                                <div className='md:w-3/4 flex gap-1.5 mt-3 w-full'>

                                                    <button className='bg-blue-500 hover:bg-gray-500 poppins2 p-2
                                                         text-white rounded-md pr-2 font-sans drop-shadow-lg text-xs md:text-base'
                                                        onClick={() => handleAddChapter(item._id)}>
                                                        Add Chap
                                                        <i className="fa-solid fa-square-plus m-1.5"></i>
                                                    </button>

                                                    <button className='bg-blue-700 hover:bg-gray-500 poppins2 p-2
                                                      text-white rounded-md pr-2 font-sans drop-shadow-lg text-xs md:text-base'
                                                        onClick={() => handleEditButton(item._id)}>
                                                        Edit Novel
                                                        <i className="fa-solid fa-pen-to-square m-1.5"></i>
                                                    </button>

                                                    <button className='bg-gray-700 hover:bg-red-700 poppins2 p-2
                                                       text-white rounded-md pr-2 font-sans drop-shadow-lg text-xs md:text-base'
                                                        onClick={() => handleCancelButton(item._id)}>
                                                        Cancel Novel
                                                        <i className="fa-solid fa-trash-can-arrow-up m-1.5"></i>
                                                    </button>

                                                </div> : <div className='md:w-3/4 flex gap-1.5 mt-3 w-full text-red-600 
                                            font-bold tracking-wider text-2xl'>
                                                    {item.status === "cancelled" ? 'THIS NOVEL IS CANCELLED' : 'THIS NOVEL IS REJECTED'}
                                                </div>
                                        }
                                        {/* READ NOW AND ADD TO LIBRARY BUTTONS END*/}


                                        {/* NOVEL VIEWS AND LIBRARY COUNT */}
                                        <div className='w-3/4 flex gap-5 ml-4 mt-3'>

                                            <small className='text-gray-300'>
                                                Views <NumberFormatter value={item.views} /> <i className="fa-solid fa-eye"></i>
                                            </small>

                                            <small className='text-gray-300'>|</small>

                                            <small className='text-gray-300'>
                                                in <NumberFormatter value={item.in_library} /> Library <i className="fa-solid fa-book-bookmark"></i>
                                            </small>

                                        </div>
                                        {/* NOVEL VIEWS AND LIBRARY COUNT END*/}


                                        {/* NOVEL DESCRIPTION */}
                                        <div className='w-full text-gray-200 overflow-hidden mt-3 p-1'>

                                            <p> {item.description} </p>

                                        </div>

                                        {/* NOVEL DESCRIPTION END*/}

                                    </div>
                                    {/* ------------ NOVEL NAME AND DESCRIPTION END------------- */}

                                </div>

                                {/* ------------ NOVEL REVIEW AND DETAILS ------------- */}
                                <div className='sm:w-2/6 flex flex-col md:pl-12 justify-center
                                    text-white text-left font-mono'>

                                    <p>
                                        <b className='font-sans'>
                                            Author:</b> {item.author_id.userName}
                                    </p>

                                    <p>
                                        <b className='font-sans'>
                                            Publish Date:</b> {new Date(item.publish_date).toLocaleDateString("en-GB")}
                                    </p>
                                    <p>
                                        <b className='font-sans'>Genres:</b> {
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
                                                />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 2 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 3 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 4 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                />
                                            </svg>
                                            <svg className="w-6 h-6 cursor-pointer text-yellow-300 me-1 hover:scale-105 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={rate >= 5 ? "currentColor" : "gray"} viewBox="0 0 22 20">
                                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                                                />
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
                                            <div className={`hover:bg-gray-500 
                                        ${chapter.gcoin > 0 ? "bg-gray-900" : 'bg-gray-600'} w-full rounded-lg
                                         p-2 md:pl-5 md:pr-5 font-medium poppins2
                                          ${chapter.gcoin > 0 ? "text-white" : 'text-gray-400'}
                                          hover:text-white hover:font-mono select-none cursor-pointer`}
                                                key={chapter._id}>

                                                <div className={`grid grid-cols-3 lg:grid-cols-5`}>

                                                    <p className='text-left text-xs lg:text-lg lg:col-span-3'>
                                                        chapter {chapter.number}: {chapter.title}
                                                    </p>

                                                    {
                                                        <p className='text-center text-xs lg:text-lg'>{chapter.gcoin ?
                                                            `${chapter.gcoin} Gcoin to unlock` : ''}</p>
                                                    }

                                                    <div >
                                                        <p className='text-right text-xs lg:text-lg md:pr-7'>
                                                            {new Date(chapter.publish_date).toLocaleDateString("en-GB")}
                                                        </p>

                                                        <div className='mt-1 text-right text-xs md:pr-4 md:text-base'>
                                                            <p className='hover:underline text-sm lg:text-xl text-gray-300 inline'
                                                                onClick={() => handleEditChapter(item._id, chapter._id)}>Edit</p>
                                                            {
                                                                chapter.number === item.chapter_count ?
                                                                    < p className='hover:underline lg:text-xl text-red-600 inline ml-2'
                                                                        onClick={() => handleDeleteChapter(item._id, chapter._id)}>Delete</p> : ''
                                                            }
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        )) : <p className='text-white text-center bg-blue-500 p-2 
                                            rounded font-mono'>no chapters yet..</p>
                                }

                            </div>
                            {/* -----------------------NOVEL CHAPTERS END-------------------- */}

                            < div className='w-full max-h-96 flex flex-col gap-3 p-5 mt-10 overflow-y-scroll scroll' >

                            </div >

                        </div >
                    ))
            }

        </>
    )
}
//.........................................................................
