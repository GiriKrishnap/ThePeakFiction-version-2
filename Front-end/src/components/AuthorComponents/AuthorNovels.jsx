import { useEffect, useState } from 'react'
import { signup, authorNovelDetails } from '../../util/constants';
import { useNavigate } from 'react-router-dom'
import { getAuthorNovelsAPI } from '../../APIs/userAPI';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';

export default function AuthorNovels() {

    const navigate = useNavigate();

    const [novels, setNovels] = useState([]);
    const [pageNumber, setPageNumber] = useState();
    const [currPage, setCurrPage] = useState(1);

    //.........................................................................

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))

        if (!user?.isAuthor) {
            navigate(signup);
        } else {

            (async () => {
                try {
                    const response = await getAuthorNovelsAPI(currPage);
                    if (response.data.status) {
                        setNovels(response.data.novels)
                        setPageNumber(Math.ceil(response.data.totalNovels / 6));
                    }

                } catch (error) {
                    console.log(error.message);
                    toast.error(error.message);
                }
            })();
        }

    }, [])
    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${authorNovelDetails}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................


    const handleChange = (event, value) => {
        setCurrPage(value);
    };


    //.........................................................................

    return (
        <>

            <div className='m-1 bg-gray-800 overflow-hidden flex flex-col rounded-lg pb-5 text-center'>

                {/* ONE_____________ */}
                <div className='p-5 w-full'>
                    <h1 className='mt-5 mb-2 text-4xl drop-shadow-md
                     text-white bold-text'>My Novels.</h1>
                    <small className='text-gray-400'>Here Your The Novels That Made By You. : )</small>
                </div>


                {/* THREE_____________ */}
                {novels.length > 0 ? '' :
                    < h1 className='font-mono text-5xl text-white text-center mt-20 mb-16'>
                        - There is No Novels <i className="fa-regular fa-face-sad-tear mt-1"></i> -
                    </h1>
                }
                <div className='grid grid-cols-2 p-5 gap-2'>

                    {
                        novels.map((item, index) => (

                            <div key={item._id}>
                                {/* -------------------NOVEL CARD---------------------------- */}
                                <div
                                    className='__CARD__  bg-gray-700 
                                   hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-600
                                   via-gray-700 to-gray-800 lg:h-64 min-h-full rounded-lg md:flex overflow-hidden
                                   md:pb-0 pb-4'
                                    onClick={() => handleClick(item._id)}>

                                    <div className='md:w-1/2 h-32 md:h-full hover:scale-105 duration-500 BANNER_PHOTO'
                                        style={{
                                            backgroundImage: `url(${item.cover})`,
                                            backgroundSize: 'cover'
                                        }}></div>

                                    <div className='w-full pl-3 pr-3 overflow-hidden'>

                                        <div className='text-right'>
                                            <p className='text-white poppins text-right text-lg bg-red-500 
                                             inline drop-shadow-md p-2 rounded-b-lg'
                                            >{item.rate}</p>
                                        </div>


                                        <p className='poppins text-white text-left mt-1 text-xl'>{item.title}</p>


                                        {/* GENRES-------------------------------- */}
                                        <div className='md:grid grid-flow-col gap-2 mt-2 '>

                                            <small className='bg-blue-700 m-0.5 pr-2 pl-2 p-0.5 text-gray-200 
                                                rounded-xl cursor-default font-mono float-left'>
                                                Author: {item?.author_id.userName} </small>

                                            {
                                                item.genre.map((genre, index) => (
                                                    index < 4 &&
                                                    <small key={genre.name}
                                                        className={`bg-blue-500 pr-2 pl-2 p-0.5 text-gray-200 float-left m-0.5
                                                rounded-xl cursor-default ${index > 4 ? 'md:hidden' : ''}`}>
                                                        {genre.name}
                                                    </small>
                                                ))
                                            }

                                        </div>

                                        {/* -------CHAPTERS----------------------- */}
                                        <div className='w-full hidden md:flex flex-col gap-2 mt-2 md:mt-6 '>

                                            {
                                                item.chapters[item.chapters.length - 1]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                     rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 1]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 1]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 2]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                          rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 2]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 2]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 3]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                          rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 3]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 3]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 4]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 hidden
                                                          rounded-full cursor-default md:grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 4]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 4]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }
                                        </div>
                                        {/* -------CHAPTERS END----------------------- */}
                                        {
                                            item.chapters.length <= 0 ?
                                                <div className='bg-gray-600 text-red-300 md:text-gray-300 mt-2 float-left
                                                md:float-none md:rounded-3xl rounded-md p-1 cursor-default font-mono md:h-full
                                                 md:p-10 ml-2'>
                                                    <p className='text-center text-xs md:text-lg'>
                                                        no chapters yet..
                                                    </p>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                                {/* -------------------NOVEL CARD END---------------------------- */}
                            </div>

                        ))
                    }

                </div>

                <div className='bg-gray-800 justify-center flex p-3'>

                    <Pagination count={pageNumber} page={currPage} siblingCount={2} color="primary" size='large'
                        onChange={handleChange} />

                </div>

            </div >




        </>
    )
}
