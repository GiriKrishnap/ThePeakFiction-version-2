import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { novelDetailedView } from '../../../util/constants';
import { authorGetGenresAPI, getAllNovelsForUsersAPI, getFilteredNovelsAPI } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';
//.........................................................................


export default function Filter() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [novels, setNovels] = useState([]);
    const [allGenre, setAllGenre] = useState([]);
    const [search, setSearch] = useState('');
    const [pageNumber, setPageNumber] = useState();
    const [currPage, setCurrPage] = useState(1);
    const [showGenre, setShowGenre] = useState(false);
    const [filterOn, setFilerOn] = useState(false);

    //.........................................................................

    useEffect(() => {
        getAllGenres();
    }, [])

    useEffect(() => {
        if (!filterOn) {
            getAllNovels();
        } else {
            handleFilter()
        }
    }, [currPage])

    //.........................................................................

    const getAllNovels = async () => {
        try {

            const response = await getAllNovelsForUsersAPI(currPage);
            if (response.data.status) {
                setNovels(response.data.novels)
                setPageNumber(Math.ceil(response.data.totalNovels / 6));
                setFilerOn(false);
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);

        }
    }

    //.........................................................................

    const getAllGenres = async () => {
        try {

            const response = await authorGetGenresAPI();

            if (response.data.status) {

                setAllGenre(response.data.genres)
                allGenre.sort()

            } else {
                console.log('backend Problem ::getAllGenres');
            }

        } catch (error) {
            console.log("error in getGenres function client side");
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleFilter = async () => {
        try {

            var checkboxes = document.getElementsByName("genres");
            var selectedGenres = [];

            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedGenres.push(checkboxes[i].value);
                }
            }

            const selectedStatus = document.getElementById("status").value;
            const selectedYear = document.getElementById("year").value;
            const selectedSort = document.getElementById("sort").value;

            const body = JSON.stringify({
                selectedGenres,
                selectedStatus,
                selectedYear,
                selectedSort,
                search
            })

            const response = await getFilteredNovelsAPI(body, currPage);

            if (response.data.status) {
                setNovels(response.data.novels)
                setPageNumber(Math.ceil(response.data.totalNovels / 6));
                setFilerOn(true);
            }

        } catch (error) {
            console.log('catch error client :: handleFilter');
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${novelDetailedView}?NovelId=${novelId}`, { replace: true });

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
                <div className='p-5 pb-1 w-full'>
                    <h1 className='mt-5 mb-2 text-4xl drop-shadow-md
                     text-white bold-text'>Filter The Novels</h1>
                    <small className='text-gray-400'>Effortlessly discover and savor captivating novels
                        with ease through efficient filtering, enabling a delightful reading experience.</small>
                </div>

                {/* TWO_____________ */}
                <div className={`font-mono tracking-widest ${showGenre ? 'bg-slate-300 text-gray-800' : 'bg-slate-600 text-gray-100'}
                 cursor-pointer select-none`}
                    onClick={() => setShowGenre(!showGenre)}>
                    {showGenre ? 'hide' : 'show'} Genres
                </div>

                <div className='w-full p-2 mt-1'>

                    {showGenre ?
                        <div className='flex flex-row gap-4 justify-center'>
                            {/* ----------------------GENRES----------------------------------------- */}
                            <div
                                className="items-center mb-4 pl-6">
                                {
                                    allGenre.map((item) => (
                                        <div className='inline m-0.5 float-left bg-gray-900 p-1 
                                            rounded-md' key={item._id} >
                                            <input id={item._id} type="checkbox" value={item._id} name='genres'
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />

                                            <label className="ms-1.5 text-sm font-medium text-gray-900 
                                                              dark:text-gray-300" >
                                                {item.name}

                                            </label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div> : ''
                    }

                    <hr className='border-red-500 border-2' />

                    <div className='sm:flex sm:gap-4 gap-2 grid grid-cols-1 p-3 justify-center font-mono'>
                        {/* ------------------------------STATUS---------------------- */}
                        <div>
                            <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={''}>Status</option>
                                <option value={'completed'}>Completed</option>
                                <option value={'ongoing'}>Ongoing</option>
                                <option value={'cancelled'}>Cancelled</option>
                            </select>
                        </div>
                        {/* ------------------------------YEAR---------------------- */}
                        <div>
                            <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={''}>Year</option>
                                <option value={2024}>2024</option>
                                <option value={2023}>2023</option>
                                <option value={2022}>2022</option>
                                <option value={2021}>2021</option>
                            </select>
                        </div>
                        {/* ------------------------------Sort---------------------- */}
                        <div>
                            <select id="sort" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={"views"}>Most viewed</option>
                                <option value={"title"}>Name A-Z</option>
                                <option value={"updated_date"}>Recently updated</option>
                                <option value={"publish_date"}>Recently added</option>
                                <option value={"in_library"}>Trending</option>
                            </select>
                        </div>
                        {/* ---------------------------SEARCH NOVELS------------------------ */}
                        <div>
                            <input type='text' className="bg-gray-500 border-0 text-white
                             text-sm rounded-lg block p-2 pl-3 w-full" placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)} />

                        </div>
                        {/* --------------------------FILTER BUTTON------------------------- */}
                        <div className='flex gap-2'>
                            <button className='bg-blue-500 p-1.5 text-white rounded-md pr-2 font-sans md:w-24 w-full'
                                onClick={handleFilter}>
                                <i className="fa-solid fa-circle-nodes ml-1 mr-1"></i>
                                Filter
                            </button>
                            <button className='bg-red-500 p-1.5 text-white rounded-md pr-2 font-sans md:w-24 w-full'
                                onClick={getAllNovels}>
                                <i className="fa-solid fa-retweet mr-1"></i>
                                Get All
                            </button>
                        </div>
                    </div>
                </div>


                {/* THREE_____________ */}
                {novels.length > 0 ? '' :
                    < h1 className='font-sans md:text-4xl text-xl text-white text-center m-28 animate-pulse'>
                        - T h e r e i s N o  N o v e l s 😑 -
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

                                        <div className='flex'>
                                            <p className='poppins text-white text-left text-xl'>{item.title}</p>
                                        </div>

                                        {/* GENRES-------------------------------- */}
                                        <div className='md:grid grid-flow-col gap-2 mt-2 '>

                                            <small className='bg-blue-700 pr-2 pl-2 p-0.5 text-gray-200 
                                                rounded-xl cursor-default font-mono'> Author: {item?.author_id.userName} </small>

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
                                                item.chapters[item.chapters.length - 1]?.title &&
                                                < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                     rounded-full cursor-default grid grid-cols-2'>
                                                    <p className='text-start'>
                                                        chapter {item.chapters[item.chapters.length - 1]?.number}
                                                    </p>
                                                    <p className='text-end'>
                                                        {new Date(item.chapters[item.chapters.length - 1]?.publish_date)
                                                            .toLocaleDateString("en-GB")}
                                                    </p>
                                                </div>

                                            }

                                            {
                                                item.chapters[item.chapters.length - 2]?.title &&
                                                < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                          rounded-full cursor-default grid grid-cols-2'>
                                                    <p className='text-start'>
                                                        chapter {item.chapters[item.chapters.length - 2]?.number}
                                                    </p>
                                                    <p className='text-end'>
                                                        {new Date(item.chapters[item.chapters.length - 2]?.publish_date)
                                                            .toLocaleDateString("en-GB")}
                                                    </p>
                                                </div>
                                            }

                                            {
                                                item.chapters[item.chapters.length - 3]?.title &&
                                                < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                          rounded-full cursor-default grid grid-cols-2'>
                                                    <p className='text-start'>
                                                        chapter {item.chapters[item.chapters.length - 3]?.number}
                                                    </p>
                                                    <p className='text-end'>
                                                        {new Date(item.chapters[item.chapters.length - 3]?.publish_date)
                                                            .toLocaleDateString("en-GB")}
                                                    </p>
                                                </div>

                                            }

                                            {
                                                item.chapters[item.chapters.length - 4]?.title &&
                                                < div className='bg-gray-600 pr-3 pl-3 text-gray-300 hidden
                                                          rounded-full cursor-default md:grid grid-cols-2'>
                                                    <p className='text-start'>
                                                        chapter {item.chapters[item.chapters.length - 4]?.number}
                                                    </p>
                                                    <p className='text-end'>
                                                        {new Date(item.chapters[item.chapters.length - 4]?.publish_date)
                                                            .toLocaleDateString("en-GB")}
                                                    </p>
                                                </div>
                                            }
                                        </div>
                                        {/* -------CHAPTERS END----------------------- */}
                                        {
                                            item.chapters.length <= 0 &&
                                            <div className='bg-gray-600 text-red-300 md:text-gray-300 mt-24 md:mt-0
                                                     md:rounded-3xl rounded-md p-2 cursor-default font-mono md:h-full md:p-10'>
                                                <p className='text-center text-xs md:text-lg'>
                                                    no chapters yet..
                                                </p>
                                            </div>
                                        }

                                    </div>

                                    {
                                        item.chapters.length > 0 &&
                                        < div className='bg-gray-600 text-gray-300 md:text-gray-300 m-3 mt-4
                                    md:rounded-3xl rounded-md p-2 cursor-default font-mono md:h-full md:p-10 md:hidden'>
                                            <p className='text-center text-xs md:text-lg'>
                                                {item.chapters.length} chapters
                                            </p>
                                        </div>
                                    }

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
//.........................................................................

