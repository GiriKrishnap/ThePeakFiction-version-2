import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { PostEditChapterAPI, getChapterEditDetailsAPI } from '../../APIs/userAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorNovelDetails, signup } from '../../util/constants';
//.........................................................................


export default function EditChapter() {

    const navigate = useNavigate();
    const location = useLocation();

    //STATES...................................................................

    const [NovelId, setNovelId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(``);

    //.........................................................................


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))

        if (!user?.isAuthor) {

            navigate(signup);

        } else {

            const queryParams = new URLSearchParams(location.search);
            const NovelIdQuery = queryParams.get('novelId');
            const ChapterIdQuery = queryParams.get('chapterId');

            if (!NovelIdQuery) {
                navigate(-1)
            } else {
                setNovelId(NovelIdQuery);
                getChapterDetails(NovelIdQuery, ChapterIdQuery);
            }
        }

    }, [])

    //.........................................................................

    const getChapterDetails = async (novelId, chapterId) => {
        try {

            const response = await getChapterEditDetailsAPI(novelId, chapterId);
            if (response.data.status) {
                setTitle(response.data.title);
                setContent(response.data.content);
            } else {
                toast.error('error on getting data');
            }

        } catch (error) {
            console.log('catch error on getChapterDetails :: fontEnd - ', error);
            toast.error(error.message);
        }
    }
    //.........................................................................

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();

            const queryParams = new URLSearchParams(location.search);
            const chapterId = queryParams.get('chapterId');

            const body = JSON.stringify({
                NovelId,
                title,
                content,
                chapterId,
            });

            let response = await PostEditChapterAPI(body);

            if (response.data.status) {

                toast.success("Chapter Edited");
                navigate(`${authorNovelDetails}?NovelId=${NovelId}`, { replace: true });

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.success(error.message);
        }
    }

    //.........................................................................

    return (
        <>
            <div className='m-2 md:m-2 bg-gray-600 p-9 hover:shadow-2xl'>

                <p className='poppins text-center text-gray-100 text-3xl mt-4 mb-1'>Edit Chapter
                    <i className="fa-solid fa-book-open ml-2"></i>
                </p>

                <small className='poppins2 text-center text-gray-400 block'>
                    Edit the chapter in your novel, lets go...
                </small>

                <form className="bg-gray-600" onSubmit={handleSubmit}>

                    {/* ----------CHAPTER TITLE----------------------- */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                         dark:text-white">Chapter Title</label>

                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-700
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="title for the chapter"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            required />
                    </div>
                    {/* ----------CHAPTER TITLE END----------------------- */}


                    {/* ----------CHAPTER MAIN CONTENT----------------------- */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                           dark:text-white">Chapter Content</label>
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-700 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700
                         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56 novelFont"
                            placeholder="Write from Here Or Past Here"
                            onChange={e => setContent(e.target.value)}
                            value={content}
                            required />
                    </div>
                    {/* ----------CHAPTER MAIN CONTENT END----------------------- */}


                    {/* ----------BUTTONS----------------------- */}
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 mt-14
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Submit</button>

                    <button type="button" className="text-white bg-red-500 hover:bg-red-600 mt-5
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center"
                        onClick={() => navigate(`${authorNovelDetails}?NovelId=${NovelId}`, { replace: true })}>
                        Cancel
                    </button>
                    {/* ----------BUTTONS END----------------------- */}

                </form>

            </div >
        </>
    )
}
