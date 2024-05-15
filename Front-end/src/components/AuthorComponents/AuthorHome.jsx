import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Signup, authorCreate, authorNovels } from '../../util/constants';
//.........................................................................


export default function AuthorHome() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'))
        if (!user?.isAuthor) {
            navigate(Signup);
        }
    }, []);

    //.........................................................................

    return (
        <>
            <div className='m-6 md:m-28 '>
                <div className='mainBody-login'>
                    <div className="flex flex-col md:flex-row gap-6`">

                        <Link to={authorNovels} className='w-full bg-blue-200 place-items-center rounded-2xl h-60 flex flex-col gap-4 justify-center
                         items-center hover:scale-95 hover:bg-blue-500 m-2  hover:text-gray-200 hover:shadow-2xl'>

                            <i className="fa-solid fa-book-open fa-2xl scale-150 m-3"></i>
                            <p className='font-mono text-3xl '>My Novels</p>

                        </Link>

                        <Link to={authorCreate} className='w-full bg-blue-300 place-items-center rounded-2xl h-60 flex flex-col gap-4 justify-center
                         items-center hover:scale-95 hover:bg-blue-500 m-2 hover:text-gray-200 hover:shadow-2xl'>

                            <i className="fa-solid fa-square-plus fa-2xl scale-150 m-3"></i>
                            <p className='font-mono text-3xl '>Create Novel</p>

                        </Link>

                    </div>
                </div >
            </div >
        </>
    )
}
