import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react'
import { adminGetAllNovelsAPI, adminNovelApproveAPI, adminNovelHideAPI, adminNovelRejectAPI } from '../../APIs/adminAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function NovelManagement() {

    //.........................................................................

    const [novels, setNovels] = useState([]);

    //.........................................................................

    useEffect(() => {
        getAllNovels();
    }, [])

    //.........................................................................

    const getAllNovels = async () => {
        try {
            const response = await adminGetAllNovelsAPI();
            if (response.data.status) {
                setNovels(response.data.novels);
            }

        } catch (error) {
            console.log("error in getUsersList function client side - ", error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    function showInputSweetAlert(novelId) {
        Swal.fire({
            title: 'Enter Text',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            preConfirm: (text) => {
                // Handle the text entered by the user
                if (!text) {
                    Swal.showValidationMessage('Please enter some text');
                }
                return text;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Make API call with the entered text
                const enteredText = result.value;
                makeApiCall(enteredText, novelId);
            }
        });
    }

    // Function to make API call
    async function makeApiCall(text, novelId) {
        // Replace this with your actual API endpoint and logic
        const body = JSON.stringify({
            novelId,
            reason: text
        })

        const response = await adminNovelRejectAPI(body);

        if (response.data.status) {
            toast.success(response.data.message)
            getAllNovels();

        } else {
            toast.error(response.data.message)
        }
    }

    //.........................................................................

    const handleApprove = async (novelId) => {
        try {

            const body = JSON.stringify({
                novelId
            })

            const response = await adminNovelApproveAPI(body);

            if (response.data.status) {
                toast.success(response.data.message)

                getAllNovels();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    //.........................................................................

    const handleReject = async (novelId) => {
        try {

            const body = JSON.stringify({
                novelId,

            })


            const response = await adminNovelRejectAPI(body);

            if (response.data.status) {
                toast.success(response.data.message)
                getAllNovels();

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    //.........................................................................

    const handleNovelHide = async (novelId, isHide) => {
        try {
            const body = JSON.stringify({
                id: novelId,
                isHide
            })

            await adminNovelHideAPI(body);

            getAllNovels();

        } catch (error) {
            console.log('catch error in :: handleNovelHide on clint side - ', error);
            toast.error(error.message);
        }
    }


    //.........................................................................

    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>Novel Management</h1>
            <br />
            {
                novels.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title & _id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Publish Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                novels.map((novel, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p className='text-xl mb-2 bold-text inline'>{novel.title}</p><br />
                                            <small>id : {novel._id}</small>
                                        </th>
                                        <td className="px-6 py-4">
                                            {novel.author_id.userName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(novel.publish_date).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className='bg-blue-500 hover:bg-blue-700
                                             text-white font-bold py-2 px-4 rounded'
                                                onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                                                More <i className="fa-solid fa-circle-info"></i>
                                            </button>
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}

                                            <dialog id={`my_modal_${index}`} className="modal p-6 bg-slate-700 rounded-xl
                                             text-white text-left w-screen">
                                                <div className="modal-box grid grid-cols-2">

                                                    <div>
                                                        <img src={`${novel.cover}`}
                                                            alt="" className='h-52 rounded-lg m-2 drop-shadow-md' />

                                                        <h3 className="font-bold tracking-wide mb-2 poppins text-4xl">
                                                            {novel.title}
                                                        </h3>
                                                        <p className="py-4 inline text-gray-200">{novel.description}</p> <br />

                                                        <hr className='m-2 border-blue-400' />

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            Author:</p> {novel.author_id.userName} <br />

                                                        <p className="py-4 inline text-md font-medium poppins                                                    
                                                     text-blue-400">Genres:</p>
                                                        {
                                                            novel.genre.map((genre) => (
                                                                <p className="py-4 inline ml-1">{genre.name}</p>
                                                            ))
                                                        } <br />

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            Status:</p> {novel.status} <br />

                                                        <p className='text-red-500 font-mono'>
                                                            {novel.status === 'reject' ? '' : novel.reason}
                                                        </p>

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            Publish Date:</p> {new Date(novel.publish_date).toLocaleDateString("en-GB")} <br />

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            InLibrary:</p> {novel.in_library} <br />

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            Views:</p> {novel.views} <br />

                                                        <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                            Rate:</p> {novel.rate} <br />


                                                    </div>

                                                    {/* <<<<<<<<<<<<<<<<<NOVEL CHAPTERS>>>>>>>>>>>>>>>>> */}
                                                    <div className='h-96 overflow-x-scroll m-7 poppins2'>

                                                        <p className='font-mono text-xl '>chapters:</p>

                                                        {
                                                            novel.chapters.map((chapter) => (

                                                                <div className='bg-gray-500 rounded-xl gap-5
                                                                p-3 flex mt-4 shadow-lg place-items-center'>
                                                                    <p className='grow ml-2'>
                                                                        chapter {chapter.number}: {chapter.title}
                                                                    </p>

                                                                    <p className='text-gray-200 font-mono mr-2'>
                                                                        {new Date(chapter.publish_date).toLocaleDateString("en-GB")} - {new Date(chapter.publish_date)
                                                                            .toLocaleTimeString('en-GB', {
                                                                                hour: '2-digit',
                                                                                minute: '2-digit',
                                                                                hour12: true,
                                                                            })}
                                                                    </p>

                                                                </div>

                                                            ))
                                                        }

                                                        {
                                                            novel.chapters.length > 0 ||
                                                            <p className='text-3xl text-center mt-10'>THERE IS NO CHAPTERS</p>
                                                        }

                                                    </div>
                                                    {/* <<<<<<<<<<<<<<<<<NOVEL CHAPTERS END>>>>>>>>>>>>>>>>> */}

                                                </div>

                                                <div className="modal-action">
                                                    <form method="dialog">
                                                        <button className="btn bg-blue-500 p-3 w-full 
                                                            rounded-md mt-4 hover:bg-blue-600">Close</button>
                                                    </form>
                                                </div>

                                            </dialog>

                                            {novel.status === 'pending' ?
                                                <>
                                                    <button className='bg-green-500 hover:bg-green-700
                                                     text-white font-bold py-2 px-4 rounded ml-2'
                                                        onClick={() => handleApprove(novel._id)}>
                                                        Approve <i className="fa-solid fa-check"></i>
                                                    </button>

                                                    <button className='bg-red-500 hover:bg-red-700
                                                     text-white font-bold py-2 px-4 rounded ml-2'
                                                        onClick={() => showInputSweetAlert(novel._id)}>
                                                        Reject <i className="fa-solid fa-xmark"></i>
                                                    </button>

                                                </> :

                                                <button className='bg-red-500 hover:bg-red-700
                                            text-white font-bold py-2 px-4 rounded ml-2'
                                                    onClick={() => handleNovelHide(novel._id, novel.is_hide)}>
                                                    {
                                                        novel.is_hide ?
                                                            <>unListed < i className="fa-solid fa-eye"></i></> :
                                                            <>listed < i className="fa-solid fa-eye-slash"></i></>
                                                    }
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no Novels</p>
            }

        </div >
    )
}
