import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { novelDetailedView, readNovel } from '../../../util/constants';
import Comments from '../../Comments/comments';
import { checkPayToReadAPI, getChapterAPI, } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';

//.........................................................................


export default function ReadNovel() {



    const location = useLocation();
    const navigate = useNavigate();



    const [darkMode, setDarkMode] = useState(true);
    const [chapter, setChapter] = useState('');
    const [NovelId, setNovelId] = useState('');
    const [chapterNumber, setChapterNumber] = useState(0);
    const [chapterNumber2, setChapterNumber2] = useState(0);
    const [fontSize, setFontSize] = useState(19)



    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const NovelId = queryParams.get('NovelId');
        const Number = queryParams.get('number');


        if (!NovelId) {
            navigate(-1)
        } else {

            getChapterWithId(NovelId, Number);
            setNovelId(NovelId)
        }

    }, [chapterNumber2])



    const getChapterWithId = async (novelId, number) => {
        try {

            const response = await getChapterAPI(novelId, number);

            if (response.data.status) {

                if (response.data.chapter.gcoin > 0) {

                    const responseData = await checkPayToReadAPI(novelId, number);

                    if (responseData.data.status) {
                        if (!responseData.data.paid) {
                            navigate(`/pay-to-read?NovelId=${novelId}&ChapterNo=${number}`);
                        } else {

                            setChapter(response.data.chapter);
                            setChapterNumber(number)
                        }
                    }

                } else {

                    setChapter(response.data.chapter);
                    setChapterNumber(number)
                }
            } else {
                toast.error(response.data.message)
                navigate(-1)
            }


        } catch (error) {
            console.log('catch error in ::getChapterWithId - ' + error.message)
            toast.error(error.message);
        }
    }

    //.........................................................................

    const handleNextAndPrevious = async (chapter) => {

        console.log('the number is - ', chapter)

        navigate(`${readNovel}?NovelId=${NovelId}&number=${chapter}`)
        setChapterNumber(chapter)
        setChapterNumber2(chapterNumber2 + 1);


        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    //.........................................................................

    const handleHomeBtn = () => {
        navigate(`${novelDetailedView}?NovelId=${NovelId}`);
    }


    const handleFontSize = (size) => {
        if (fontSize < 30 && size === 'INC') {
            setFontSize(fontSize + 1);
        } else if (fontSize > 15 && size === 'DEC') {
            setFontSize(fontSize - 1);
        }
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };


    //.........................................................................

    return (
        <>

            {/* ---------------CHAPTER TITLE , DARK MODE----------------- */}
            <div className={`${darkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-black"} " 
             flex flex-col mb-1  "`}>

                <div className={`${darkMode ? "bg-gray-800 " : "bg-gray-300 "} " 
                "bg-black h-24 w-full grid rounded-b-3xl grid-cols-4 "`}>

                    <div className='bold-text flex flex-col justify-center pl-10 tracking-wide col-span-3'>

                        <small> <i className="fa-solid fa-book"></i> {chapter?.title}</small>
                        <p className='md:text-2xl text-lg'>Chapter {chapter?.number} : {
                            chapter?.title}</p>

                    </div>

                    <div className='flex justify-end mr-10 place-items-center md:gap-6'>

                        <div className='hidden md:flex opacity-80 bg-slate-600 p-4 pl-6 pr-6 rounded-2xl hover:scale-105
                        hover:shadow-lg shadow-black gap-3 justify-center place-items-center'>
                            <i className="fa-solid fa-expand fa-lg hover:scale-125"
                                onClick={toggleFullScreen}></i>
                            <p>|</p>
                            <i className="fa-solid fa-up-right-and-down-left-from-center fa-lg hover:scale-125"
                                onClick={() => handleFontSize('INC')}></i>
                            <p className='font-mono font-extrabold text-sm'>{fontSize}</p>
                            <i className="fa-solid fa-down-left-and-up-right-to-center fa-lg hover:scale-125"
                                onClick={() => handleFontSize('DEC')}></i>
                        </div>

                        <p onClick={() => setDarkMode(!darkMode)}>
                            {
                                darkMode ?
                                    <i className="fa-solid fa-2xl fa-moon hover:scale-125"></i> :
                                    <i className="fa-solid fa-2xl fa-sun hover:scale-125"></i>
                            }
                        </p>

                    </div>

                </div>
                {/* --------------------CHAPTER TITLE , DARK MODE END---------------- */}


                {/* --------------------------CONTENT------------------------------ */}
                <div className='w-full p-10 novelFont select-none' style={{ fontSize: `${fontSize}px` }}>
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                        {chapter?.content}
                    </p>
                </div>
                {/* --------------------------CONTENT END------------------------------ */}



                {/* --------------------------BUTTONS------------------------------ */}
                <div className='w-full p-5 text-xl novelFont flex gap-2 justify-center text-white'>

                    {
                        chapterNumber > 1 ?
                            <button className='bg-blue-600 w-32 p-2 rounded-lg hover:bg-blue-800'
                                onClick={() => handleNextAndPrevious(parseInt(chapterNumber) - 1)}>
                                <i className="fa-solid fa-angle-left"></i> Previous
                            </button> : ''
                    }


                    <button className='bg-gray-600 p-2 w-32 rounded-lg hover:bg-gray-800'
                        onClick={() => handleHomeBtn()}>
                        Home <i className="fa-solid fa-house"></i>
                    </button>

                    {
                        chapter?.content ?
                            <button className='bg-blue-600 p-2 w-32 rounded-lg hover:bg-blue-800'
                                onClick={() => handleNextAndPrevious(parseInt(chapterNumber) + 1)}>
                                Next <i className="fa-solid fa-angle-right"></i>
                            </button> : ''
                    }

                </div>



            </div >

            <div className='bg-gray-700 p-5 mt-1 mb-1 text-white text-2xl font-mono'>
                <Comments novelId={chapter?._id} chapterNo={chapterNumber + 1} />
            </div>

        </>
    )
}

//.........................................................................
