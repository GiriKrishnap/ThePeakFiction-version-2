import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { adminEditGenreAPI, adminGetAllGenreAPI, adminListGenreAPI, createGenresAPI } from '../../APIs/adminAPI';
//.........................................................................


export default function UserManagement() {

    //.........................................................................

    const [genre, setGenre] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [genreDescription, setGenreDescription] = useState('');
    const [editedGenreId, setEditedGenreId] = useState('');
    const [editedGenre, setEditedGenre] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    //.........................................................................

    useEffect(() => {
        getGenres();
    }, [])

    //.........................................................................

    const getGenres = async () => {
        try {
            const response = await adminGetAllGenreAPI();
            if (response.data.status) {
                setGenre(response.data.genres);
            } else {
                alert('there is problem')
            }

        } catch (error) {
            console.log("error in getGenres function client side - ", error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleGenreList = async (genreId, isHide) => {
        try {
            const body = JSON.stringify({
                genreId,
                isHide
            })

            const response = await adminListGenreAPI(body);
            if (response.data.status) {
                toast.error("Done", {

                    icon: '😼✔', style: {
                        borderRadius: '30px',
                    },
                })
                getGenres();
            }


        } catch (error) {
            console.log('catch error in :: handleGenreHide on clint side - ', error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    const handleAddGenre = async () => {
        try {

            if (!genreName || !genreDescription) {

                toast.error("fill the form!");

            } else {
                const body = JSON.stringify({
                    genreName,
                    genreDescription
                })

                const response = await createGenresAPI(body);
                if (response.data.status) {

                    toast.success("Added");

                    setGenreName('');
                    setGenreDescription('');
                    getGenres();

                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    //.........................................................................

    const handleEditGenre = async () => {
        try {
            const body = {
                genreId: editedGenreId,
                name: editedGenre,
                description: editedDescription
            }

            const response = await adminEditGenreAPI(body)
            if (response.data.status) {
                toast.success('updated');
                getGenres();
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log('error on handleEditGenre - ', error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleEditButton = async (name, description, id) => {
        try {
            setEditedGenre(name);
            setEditedDescription(description);
            setEditedGenreId(id)
        } catch (error) {
            console.log('error on handleEditGenre - ', error);
        }
    }
    //.........................................................................


    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>UserManagement</h1>
            <br />

            <button className='btn h-10 p-2 w-1/5 rounded-lg m-2 grid bg-blue-500 text-white
             hover:bg-blue-600 hover:font-mono'
                onClick={() => document.getElementById('my_modal_genre').showModal()}>Add Genre</button>

            <dialog id="my_modal_genre" className="modal bg-blue-200 p-5 w-1/2 rounded-lg">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle bg-blue-100 p-1 w-8 rounded-full btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-5 '>

                        <h3 className="font-bold text-lg">Add Genre!</h3>
                        <input type="text" className='rounded-md p-3 w-full' placeholder='name'
                            onChange={e => setGenreName(e.target.value)}
                            value={genreName} />
                        <textarea className='rounded-md p-1 pl-3 w-full' placeholder='description'
                            onChange={e => setGenreDescription(e.target.value)}
                            value={genreDescription} />
                        <p className='rounded-md p-1 pl-3 w-full bg-blue-500 text-white cursor-pointer'
                            placeholder='genre name'
                            onClick={handleAddGenre}
                        >Confirm</p>

                    </div>
                </div>
            </dialog>

            <dialog id="my_modal_genre_edit" className="modal bg-blue-200 p-5 w-1/2 rounded-lg">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle bg-blue-100 p-1 w-8 rounded-full btn-ghost absolute right-2 
                        top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-5 '>

                        <h3 className="font-bold text-lg">Edit Genre!</h3>
                        <input type="text" className='rounded-md p-3 w-full' placeholder='name'
                            onChange={e => setEditedGenre(e.target.value)}
                            value={editedGenre} />
                        <textarea className='rounded-md p-1 pl-3 w-full' placeholder='description'
                            onChange={e => setEditedDescription(e.target.value)}
                            value={editedDescription} />
                        <p className='rounded-md p-1 pl-3 w-full bg-blue-500 text-white cursor-pointer'
                            placeholder='genre name'
                            onClick={handleEditGenre}
                        >Confirm</p>

                    </div>
                </div>
            </dialog>





            {
                genre.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Name & _id
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genre.map((item, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p className='inline text-lg'>{item.name}</p> <br />
                                            <p className='inline scale text-gray-400'>id : {item._id}</p>
                                        </th>
                                        <th className="px-6 py-4 text-gray-300">
                                            {item.description}
                                        </th>
                                        <th className="px-6 py-4 flex gap-3">
                                            <button className='bg-blue-500 hover:bg-blue-700
                                             text-white font-bold py-2 px-4 rounded'
                                                onClick={() => {
                                                    document.getElementById('my_modal_genre_edit').showModal();
                                                    handleEditButton(item.name, item.description, item._id);
                                                }}>

                                                Edit
                                            </button>

                                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2
                                             px-4 rounded'
                                                onClick={() => handleGenreList(item._id, item.is_Hide)}>
                                                {
                                                    item.is_Hide ?
                                                        <>unListed < i className="fa-solid fa-eye-slash"></i> </> :
                                                        <>listed < i className="fa-solid fa-eye"></i></>
                                                }
                                            </button>

                                        </th>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no genre</p>
            }

        </div >
    )
}
//.........................................................................