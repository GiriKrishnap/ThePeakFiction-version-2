import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authorHome, authorNovels, login } from '../../util/constants';
import { authorGetGenresAPI, authorNovelEditAPI, getNovelDetailByIdAPI } from '../../APIs/userAPI';
//.........................................................................


export default function EditNovel() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();

    //.........................................................................

    const [novelId, setNovelId] = useState('');
    const [coverUrl, setCoverUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cover, setCover] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [allGenre, setAllGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);


    //.........................................................................

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))
        const queryParams = new URLSearchParams(location.search);
        const novelId = queryParams.get('novelId');

        if (!user?.isAuthor) {
            navigate(login);
        } if (!novelId) {
            navigate(-1)
        } else {

            getNovelData(novelId, user.id);
            setNovelId(novelId);
            getAllGenres();

        }

    }, [])

    //.........................................................................

    const getNovelData = async (novelId, authorId) => {
        try {

            const response = await getNovelDetailByIdAPI(novelId)
            if (response.data.status) {
                if (response.data.novelData.author_id !== authorId) {
                    toast.error('Its Not Your Work')
                    navigate(-1)
                }
                setTitle(response.data.novelData.title);
                setCoverUrl(response.data.novelData.cover);
                setDescription(response.data.novelData.description);
                setSelectedGenre(response.data.novelData.genre);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            navigate(-1)
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
                toast.error('backend error');
            }

        } catch (error) {
            console.log("error in getGenres function client side");
            toast.error(error.message);
        }
    }

    //.........................................................................

    const handleCoverChange = (e) => {

        const selectedCover = e.target.files[0] ?? null

        setCover(selectedCover);

        if (selectedCover) {
            const previewURL = URL.createObjectURL(selectedCover);
            setCoverPreview(previewURL);
        } else {
            setCoverPreview(null);
            setCover(null);
        }

    }

    //.........................................................................

    const handleSubmit = async (e) => {
        e.preventDefault();
        var checkboxes = document.getElementsByName("genres");
        var selectedGenres = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedGenres.push(checkboxes[i].value);
            }
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('photo', cover);
        formData.append('genre', selectedGenres);
        formData.append('novelId', novelId);

        try {
            const response = await authorNovelEditAPI(novelId, title, formData);
            if (response.data.status) {

                toast.success(response.data.message);
                navigate(authorNovels);

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error uploading Novel:', error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    return (
        <>
            <div className='m-2 md:m-16 bg-gray-600 md:p-16 p-5 rounded-2xl hover:shadow-2xl'>

                <form className="max-w-2xl mx-auto bg-gray-600" onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                         dark:text-white">Novel Title</label>

                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-700
                         text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="title for the novel"
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                            required />
                    </div>

                    <div className="mb-7">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                         dark:text-white">Description</label>
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white" placeholder="give an description"
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            required />
                    </div>


                    <div className='grid md:grid-cols-5 gap-2 grid-cols-2 mt-6'>
                        <p className='text-gray-200 font-mono '>  Old Genres --- </p>

                        {
                            selectedGenre.map((item) => (
                                <p className='bg-blue-500 pr-2 pl-2 p-0.5 text-gray-200 m-0.5
                            rounded-xl cursor-default'
                                    key={item._id}>
                                    {item.name}
                                </p>
                            ))
                        }
                    </div>

                    <div className='grid md:grid-cols-5 gap-2 grid-cols-2 mt-6'>


                        <p className=' text-gray-200 font-mono'> Select new --- </p>
                        {
                            allGenre.map((item, index) => (

                                <div className="flex items-center mb-4 " key={index + 1}>
                                    <input id={item.id} type="checkbox" value={item._id} name='genres'
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500
                                         dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                          dark:border-gray-600"
                                    />

                                    <label className="ms-2 text-sm font-medium text-gray-900 
                                     dark:text-gray-300" >{item.name}</label>
                                </div>
                            ))
                        }
                    </div>

                    <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Upload Cover</label>

                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex justify-center h-72 w-full p-3 md:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="md:w-8 md:h-8 h-5 w-5 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 md:text-md font-mono text-sm text-gray-500 dark:text-gray-400">
                                    Click to upload
                                    <span className="md:inline hidden"> or drag and drop</span >
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                                    PNG or JPG (MAX. 800x400px)
                                </p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" onChange={handleCoverChange} />
                        </label>
                        {coverPreview && (
                            <div>

                                <img src={coverPreview} className='rounded-lg content-center' alt="Selected"
                                    style={{ maxWidth: '100%', maxHeight: '340px' }} />
                            </div>
                        )}

                        {!coverPreview && (
                            <div>

                                <div className='md:w-52 md:h-64 w-36 h-72 rounded-lg content-center overflow-hidden text-white font-mono p-2
                                 shadow-black'
                                    style={novelId ?
                                        {
                                            backgroundImage: `url(${coverUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        } : {}}
                                ><p className='shadow-black shadow-md inline p-0.5 bg-blue-500 bg-opacity-75'>Old Cover</p></div>
                            </div>
                        )}

                    </div>


                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 mt-14
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Submit</button>

                    <Link to={authorHome} >

                        <button className="text-white bg-red-500 hover:bg-red-600 mt-3
                            focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                                py-2.5 text-center" type='button'>
                            Cancel
                        </button>
                    </Link>
                </form>

            </div >
        </>
    )
}

//.........................................................................

