import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { authorAddChapterAPI, paymentEligibleCheckAPI } from '../../APIs/userAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorNovelDetails, signup } from '../../util/constants';
//.........................................................................


export default function AuthorCreate() {

    const navigate = useNavigate();
    const location = useLocation();

    //STATES...................................................................

    const [NovelId, setNovelId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(``);
    const [paymentSystem, setPaymentSystem] = useState(false);
    const [gcoin, setGcoin] = useState(0);

    //.........................................................................


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))

        if (!user?.isAuthor) {

            navigate(signup);

        } else {

            const queryParams = new URLSearchParams(location.search);
            const NovelIdQuery = queryParams.get('NovelId');

            if (!NovelIdQuery) {
                navigate(-1)
            } else {
                setNovelId(NovelIdQuery);
            }
        }

    }, [])

    //.........................................................................

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();

            const queryParams = new URLSearchParams(location.search);
            const chapterNumber = queryParams.get('number');

            const body = JSON.stringify({
                NovelId,
                title,
                content,
                chapterNumber,
                gcoin
            });

            let response = await authorAddChapterAPI(body);

            if (response.data.status) {

                toast.success(response.data.message);
                navigate(`${authorNovelDetails}?NovelId=${NovelId}`, { replace: true })

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.success(error.message);
        }
    }

    //.........................................................................

    const checkPayment = async () => {
        try {

            const body = JSON.stringify({
                NovelId
            })
            const response = await paymentEligibleCheckAPI(body);
            if (response.data.status) {

                toast.success("Eligible for Payment");
                setPaymentSystem(true);

            } else {
                toast.error("No enough View Count");
            }

        } catch (error) {

            console.log('error on checkPayment - ', error);
            toast.error(error.message);
        }
    }


    //.........................................................................

    return (
        <>
            <div className='m-2 md:m-2 bg-gray-600 p-9 hover:shadow-2xl'>

                <p className='poppins text-center text-gray-100 text-3xl mt-4 mb-1'>Add Chapter
                    <i className="fa-solid fa-book-open ml-2"></i>
                </p>

                <small className='poppins2 text-center text-gray-400 block'>
                    add the chapter for your novel, lets go...
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
                            onChange={e => setTitle(e.target.value)} required />
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
                            onChange={e => setContent(e.target.value)} required />
                    </div>
                    {/* ----------CHAPTER MAIN CONTENT END----------------------- */}



                    {
                        !paymentSystem ?
                            /* ----------Add Payment system----------------------- */

                            < p className="text-white hover:bg-gray-700 mt-14
                            focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                              py-2.5 text-center cursor-pointer"
                                onClick={checkPayment}>
                                Add Payment System
                            </p>

                            /* ----------Add Payment system end----------------------- */
                            :
                            <div className='flex gap-2 text-white font-mono text-center pt-5'>

                                <p className='p-3 bg-gray-500 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl
                                 hover:bg-gray-800'
                                    onClick={() => setGcoin(0)}>
                                    none
                                </p>
                                <p className='p-3 bg-blue-600 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl
                                 hover:bg-blue-700'
                                    onClick={() => setGcoin(2)}>
                                    2rs
                                </p>
                                <p className='p-3 bg-blue-600 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl
                                 hover:bg-blue-700'
                                    onClick={() => setGcoin(5)}>
                                    5rs
                                </p>
                                <p className='p-3 bg-blue-600 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl
                                 hover:bg-blue-700'
                                    onClick={() => setGcoin(10)}>
                                    10rs
                                </p>
                                <p className='p-3 bg-blue-600 rounded-2xl grow hover:scale-105 shadow-md hover:shadow-2xl
                                 hover:bg-blue-700'
                                    onClick={() => setGcoin(15)}>
                                    15rs
                                </p>




                            </div>
                    }

                    {
                        gcoin ?
                            <p className='text-center mt-4 text-white poppins2'>
                                {`You Selected ${gcoin}rs for this chapter`}
                            </p> : ''
                    }

                    {/* ----------BUTTONS----------------------- */}
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 mt-14
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Submit</button>

                    <button type="submit" className="text-white bg-red-500 hover:bg-red-600 mt-5
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
