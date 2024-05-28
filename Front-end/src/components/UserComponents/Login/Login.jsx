import { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { signup, verifyOptPageUrl, readerHome } from '../../../util/constants';
import toast from 'react-hot-toast';
import axios from '../../../util/axios'
//.........................................................................
import { useGoogleLogin } from '@react-oauth/google';


export default function Login() {

    //.........................................................................

    const handleGoogleLoginSuccess = async (tokenResponse) => {

        const accessToken = tokenResponse.access_token;
        const response = await axios.post('/login', { googleAccessToken: accessToken });

        if (response.data.status) {

            localStorage.setItem('user-login', JSON.stringify(response.data.details));
            localStorage.setItem('token', response.data.token);

            toast.error(response.data.message, {
                icon: '😼✔', style: {
                    borderRadius: '30px',
                },
            })


            navigate(readerHome);

        } else if (response.data.need_verify) {

            toast.error(response.data.message, {
                icon: '😿🔒', style: {
                    borderRadius: '30px',
                    background: '#444',
                    color: '#fff',
                },
            })

            navigate(`${verifyOptPageUrl}?email=${email}`);

        } else {

            toast.error(response.data.message, {
                icon: '😿❌', style: {
                    borderRadius: '30px',
                    background: '#444',
                    color: '#fff',
                },
            })
        }

    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess })
    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [email, setEmail] = useState('katokem540@lucvu.com');
    const [password, SetPassword] = useState('login');

    //.........................................................................


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (email || password) {

                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const validEmail = emailRegex.test(email);

                if (!validEmail) {

                    toast.error("Invalid Email Address", {
                        icon: '😿', style: {
                            borderRadius: '30px',
                            background: '#444',
                            color: '#fff',
                        },
                    })

                } else {

                    const body = JSON.stringify({
                        email,
                        password
                    })

                    const response = await axios.post('/login', body,
                        { headers: { "Content-Type": "application/json" } });

                    if (response.data.status) {

                        localStorage.setItem('user-login', JSON.stringify(response.data.details));
                        localStorage.setItem('token', response.data.token);

                        toast.error(response.data.message, {
                            icon: '😼✔', style: {
                                borderRadius: '30px',
                            },
                        })

                        navigate(readerHome);

                    } else if (response.data.need_verify) {

                        toast.error(response.data.message, {
                            icon: '😿🔒', style: {
                                borderRadius: '30px',
                                background: '#444',
                                color: '#fff',
                            },
                        })

                        navigate(`${verifyOptPageUrl}?email=${email}`);

                    } else {

                        toast.error(response.data.message, {
                            icon: '😿❌', style: {
                                borderRadius: '30px',
                                background: '#444',
                                color: '#fff',
                            },
                        })
                    }
                }

            } else {

                toast.error("Fill The Form Correctly‼", {
                    icon: '😿', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    //.........................................................................


    const handleChangePassword = async () => {
        try {
            if (!email) {
                toast.error('Fill the Email Field')
            } else {
                const body = {
                    email: email
                }

                const response = await axios.post('/changePassword-request', body,
                    { headers: { "Content-Type": "application/json" } });
                if (response.data.status) {

                    toast.success('Check Your Mail', { icon: "😼✉" })
                } else {
                    toast.error(response.data.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
            console.log('catch error frontEnd :: handleChangePassword - ', error)
        }
    }

    //.........................................................................

    return (
        <>


            <div className='flex justify-center place-items-center text-black select-none'>

                <div className='md:w-1/2 w-full md:m-9 m-5 md:h-1/2  bg-white rounded-2xl drop-shadow-xl 
                      flex flex-col justify-center place-items-center p-20 hover:shadow-2xl '>

                    <div className='flex'>
                        <h1 className='poppins2 font-bold md:text-4xl text-2xl mb-4'>Login</h1>
                        <img src="../assets/logo/webLogo.png" alt="logo" className='w-12 h-12' />
                    </div>

                    <input type="email" name="email" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)} value={email} required />


                    <input type="password" name="password" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='Password'
                        onChange={e => SetPassword(e.target.value)} value={password} required />

                    <p className='text-blue-900 font-mono cursor-pointer hover:tracking-widest duration-500'
                        onClick={handleChangePassword}>
                        forgot your Password?
                    </p>

                    <button type='submit' className='w-full p-3 mt-3 mb-2 bg-blue-400 text-white
                        rounded-xl hover:bg-blue-950 hover:shadow-xl'
                        onClick={handleSubmit}>Login Now</button>

                    <hr />

                    <button type='submit' className='w-full p-3 mt-2 mb-1 text-black border border-black
                        rounded-xl hover:shadow-xl poppins2 text-center hover:bg-slate-700 hover:text-white'
                        onClick={() => login()}>
                        <i className="fa-brands fa-lg fa-google mr-2"></i>Login with google
                    </button>

                    <Link to={signup}> <p className='font-mono tracking-widest text-lg mt-5
                    hover:text-blue-500'>No Account?</p> </Link>

                </div>
            </div >

        </>
    )
}
//.........................................................................
