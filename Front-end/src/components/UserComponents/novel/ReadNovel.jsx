import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { novelDetailedView, readNovel } from '../../../util/constants';
import Comments from '../../Comments/comments';
import { checkPayToReadAPI, getChapterAPI, } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function ReadNovel() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [darkMode, setDarkMode] = useState(true);
    const [chapter, setChapter] = useState('');
    const [NovelId, setNovelId] = useState('');
    const [chapterNumber, setChapterNumber] = useState(0);
    const [chapterNumber2, setChapterNumber2] = useState(0);


    //.........................................................................

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



    //.........................................................................

    const getChapterWithId = async (novelId, number) => {
        try {

            const userId = JSON.parse(localStorage.getItem("user-login")).id;
            const response = await getChapterAPI(novelId, number, userId);

            if (response.data.status) {

                if (response.data.chapter.gcoin > 0) {

                    const responseData = await checkPayToReadAPI(novelId, number, userId);

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

    const handleHomeBtn = async () => {
        navigate(`${novelDetailedView}?NovelId=${NovelId}`);
    }

    //.........................................................................

    return (
        <>

            {/* ---------------CHAPTER TITLE , DARK MODE----------------- */}
            <div className={`${darkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-black"} " 
             flex flex-col mb-1  "`}>

                <div className={`${darkMode ? "bg-gray-800 " : "bg-gray-300 "} " 
                "bg-black h-24 w-full grid rounded-b-3xl grid-cols-4  "`}>

                    <div className='bold-text flex flex-col justify-center pl-10 tracking-wide col-span-3'>

                        <small> <i className="fa-solid fa-book"></i> {chapter?.title}</small>
                        <p className='md:text-2xl text-lg'>Chapter {chapter?.number} : {
                            chapter?.title}</p>

                    </div>

                    <div className='flex flex-col justify-center pr-10 text-right'>
                        <p onClick={() => setDarkMode(!darkMode)}>
                            {
                                darkMode ?
                                    <i className="fa-solid fa-2xl fa-moon"></i> :
                                    <i className="fa-solid fa-2xl fa-sun"></i>
                            }
                        </p>
                    </div>

                </div>
                {/* --------------------CHAPTER TITLE , DARK MODE END---------------- */}


                {/* --------------------------CONTENT------------------------------ */}
                <div className='w-full p-10 text-xl novelFont select-none'>
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
                {/* --------------------------BUTTONS END------------------------------ */}


            </div >

            <div className='bg-gray-700 p-5 mt-1 mb-1 text-white text-2xl font-mono'>
                <Comments novelId={chapter?._id} chapterNo={chapterNumber + 1} />
            </div>

        </>
    )
}

//.........................................................................
