import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { adminDashboard, adminLoginPost } from '../../util/constants';

export default function AdminLogin() {
    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //.........................................................................

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            email,
            password
        })
        let response = await axios.post(adminLoginPost, body, { headers: { "Content-Type": "application/json" } });
        if (response.data.adminToken) {
            localStorage.setItem("AdminToken", response.data.adminToken);
            navigate(adminDashboard);

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }

    //.........................................................................

    useEffect(() => {
        try {
            const adminToken = localStorage.getItem('AdminToken');
            if (adminToken) {
                navigate(adminDashboard);
            }
        } catch (error) {
            console.error('Error in useEffect of adminLogin:', error);
        }
    }, []);

    //.........................................................................

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-blue-950">
                <div className="bg-gray-200 rounded-2xl border hover:shadow-sm p-10 max-w-lg">
                    <div className="flex flex-col items-center space-y-4">
                        <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                            Welcome Back Boss!
                        </h1>
                        <p className="text-sm text-gray-500 text-center w-5/6">
                            we glad you come back
                        </p>

                        <form action="" onSubmit={handleSubmit} className='flex flex-col items-center space-y-4'>

                            <input
                                type="email"
                                placeholder="Email"
                                className="border-2 rounded-lg w-full h-12 px-4"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                className="border-2 rounded-lg w-full h-12 px-4"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />

                            <button
                                className="bg-blue-500 text-white rounded-md
                             hover:bg-red-500 font-semibold px-4 py-3 w-full"
                                type='submit'
                            > Login Now </button>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
//.........................................................................
