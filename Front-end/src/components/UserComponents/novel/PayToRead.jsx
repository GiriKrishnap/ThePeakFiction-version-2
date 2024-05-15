
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PayToReadPostAPI, checkPayToReadAPI } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
import { novelDetailedView, readNovel } from '../../../util/constants';
import io from 'socket.io-client';

//.........................................................................


export default function PayToRead() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();
    const socket = useMemo(() => io('https://pureglow.live'), [])

    //.........................................................................

    const [novelId, setNovelId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [chapterNumber, setChapterNumber] = useState('');
    const [price, setPrice] = useState(0);
    const [password, setPassword] = useState('');

    //.........................................................................

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const NovelIdQuery = queryParams.get('NovelId');
        const ChapterNoQuery = queryParams.get('ChapterNo');

        if (!NovelIdQuery || !ChapterNoQuery) {
            navigate(-1)
        } else {
            setNovelId(NovelIdQuery);
            setChapterNumber(ChapterNoQuery);
            checkDetails(NovelIdQuery, ChapterNoQuery)
        }
        return () => {
            socket.disconnect();
        }

    }, [])
    //.........................................................................

    const checkDetails = async (novelId, chapterNo) => {
        try {
            const userId = JSON.parse(localStorage.getItem("user-login")).id;

            const response = await checkPayToReadAPI(novelId, chapterNo, userId);

            if (response.data.status) {

                if (response.data.paid) {

                    navigate(`${readNovel}?NovelId=${novelId}&number=${chapterNo}`);

                } else if (response.data.price) {

                    setPrice(response.data.price);
                    setAuthorId(response.data.authorId)

                } else {
                    navigate(`${readNovel}?NovelId=${novelId}&number=${chapterNo}`);
                }
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    //.........................................................................


    const handleSubmit = async () => {
        try {

            if (!password) {
                toast.error('Give Password')
            } else {

                const userId = JSON.parse(localStorage.getItem("user-login")).id;

                const body = {
                    novelId,
                    chapterNumber,
                    userId,
                    password,
                    price
                }

                const response = await PayToReadPostAPI(body);
                if (response.data.status) {
                    toast.success(response.data.message);
                    socket.emit("notification_purchase", authorId);
                    navigate(`${readNovel}?NovelId=${novelId}&number=${chapterNumber}`);

                } else {
                    toast.error(response.data.message);
                }


            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //.........................................................................

    const handleBackButton = async (e) => {
        navigate(`${novelDetailedView}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................

    return (
        <>

            <div className='h-screen flex justify-center place-items-center text-black select-none'>

                <div className='md:w-1/2 w-full m-10 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                      flex flex-col justify-center place-items-center md:p-40 p-20 hover:shadow-2xl '>

                    <p className='poppins2 font-bold md:text-4xl text-2xl'>
                        Pay - to - Read
                    </p>

                    <small className='text-gray-400 mt-2 font-mono'>
                        pay to read this chapter
                    </small>

                    <p className='text-3xl p-1 m-5 text-white font-bold bg-gray-400 
                    w-full text-center rounded-2xl shadow-sm'>
                        {price}rs
                    </p>

                    <input type="password" name="password" className='w-full p-2 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                    focus:shadow-xl'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} value={password} maxLength={8}
                        required autoComplete='false' />

                    <div className='grid grid-cols-2 w-full gap-2'>
                        <button className='w-full p-2 mt-4 bg-blue-500 text-white
                        rounded-xl hover:bg-blue-600 hover:shadow-xl' onClick={handleBackButton}>
                            back
                        </button>

                        <button className='w-full p-2 mt-4 bg-blue-400 text-white
                        rounded-xl hover:bg-blue-600 hover:shadow-xl' onClick={handleSubmit}>
                            Confirm
                        </button>
                    </div>

                </div>

            </div>

        </>
    )
}
//.........................................................................
