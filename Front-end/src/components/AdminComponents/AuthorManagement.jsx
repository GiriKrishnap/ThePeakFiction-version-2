import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { adminBlockUserAPI, adminGetAllAuthorsAPI } from '../../APIs/adminAPI';
//.........................................................................


export default function AuthorManagement() {

    //.........................................................................

    const [authors, setAuthors] = useState([]);

    //.........................................................................


    useEffect(() => {
        getAuthorsList();
    }, [])

    //.........................................................................

    const getAuthorsList = async () => {
        try {

            const response = await adminGetAllAuthorsAPI()

            if (response.data.status) {

                setAuthors(response.data.authors);

            } else {
                toast.error('res.status is false');
            }

        } catch (error) {
            console.log("error in getUsersList function client side", error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    const handleBlockUser = async (userId, isBlock) => {
        try {
            const body = JSON.stringify({
                userId,
                isBlock
            })

            const response = await adminBlockUserAPI(body);
            if (response.data.status) {
                toast.error("Done", {

                    icon: '😼✔', style: {
                        borderRadius: '30px',
                    },
                })
                getAuthorsList();
            }


        } catch (error) {
            console.log('catch error in :: handleNovelHide on clint side - ', error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>Author Management</h1>
            <br />
            {
                authors.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Pen Name & _id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Wallet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                authors.map((user, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.userName} <br />
                                            id : {user._id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            "Coming Soon"
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className='bg-red-500 hover:bg-red-700 text-white
                                             font-bold py-2 px-4 rounded'
                                                onClick={() => handleBlockUser(user._id, user.is_Block)}>
                                                {
                                                    user.is_Block ?
                                                        <>unBlock <i className="fa-solid fa-user-check"></i></> :
                                                        <>Block <i className="fa-solid fa-user-lock"></i></>
                                                }
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no authors</p>
            }

        </div>
    )
}
//.........................................................................

