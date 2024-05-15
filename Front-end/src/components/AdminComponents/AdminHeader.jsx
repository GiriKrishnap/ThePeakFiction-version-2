import React, { useEffect } from 'react'
import { adminLogin } from '../../util/constants';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//.........................................................................


//.........................................................................

const sideBar = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Users', link: '/admin/users' },
    { name: 'Authors', link: '/admin/authors' },
    { name: 'Novels', link: '/admin/novels' },
    { name: 'Genres', link: '/admin/genres' }
]

//.........................................................................

export default function AdminHeader() {

    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Logout?',
            text: "Do you want to Logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                navigate(adminLogin);
            }
        })
    }

    //.........................................................................

    useEffect(() => {
        const adminToken = localStorage.getItem('AdminToken');

        if (!adminToken) {
            navigate(adminLogin);
        }
    }, [])

    //.........................................................................

    return (
        <>
            <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer"

            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>
            <div
                className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center">
                        <img src="../assets/logo/webLogo.png" className='h-12 mt-2' />
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">ThePeakFiction - Admin</h1>
                        <i
                            className="bi bi-x cursor-pointer ml-28 lg:hidden"

                        ></i>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>

                {
                    sideBar.map((item) => (

                        <Link to={item.link} key={item.name}>
                            <div
                                className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 
                        cursor-pointer hover:bg-blue-600 text-white"

                            >
                                <i className="bi bi-house-door-fill"></i>
                                <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.name}</span>
                            </div></Link>

                    ))
                }



                <div className="my-4 bg-gray-600 h-[1px]"></div>

                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer
                     hover:bg-red-600 text-white bg-blue-500"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                </div>
            </div >
        </>
    )
}
