import { useState } from 'react'
import { Login, VerifyOptPageUrl } from '../../../util/constants';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { userSignUpPostAPI } from '../../../APIs/userAPI';

//.........................................................................

export default function Signup() {

    //.........................................................................

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName || !email || !password || !confirmPassword || password !== confirmPassword) {

            toast.success("Fill The Form Correctly‼", {
                icon: '😿', style: {
                    borderRadius: '30px',
                    background: '#444',
                    color: '#fff',
                },
            })

        } else {

            const body = JSON.stringify({
                userName,
                email,
                password,
                isAuthor
            })

            const response = await userSignUpPostAPI(body);

            if (response.data.status) {

                toast.success("Check Your Email For OTP", {
                    icon: '😼✉', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })

                navigate(`${VerifyOptPageUrl}?email=${email}`);


            } else if (response.data.need_verify) {

                toast.error(response.data.message, {
                    icon: '😿🔒', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })

                navigate(`${VerifyOptPageUrl}?email=${email}`);

            } else {

                toast.error(response.data.message, {
                    icon: '😿', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })

            }
        }
    }

    //.........................................................................


    return (
        <>

            <div className='flex justify-center h-full place-items-center text-black select-none'>

                <div className='md:w-1/2 w-full md:m-10 m-4 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                     flex flex-col justify-center place-items-center md:p-14 md:pl-20 md:pr-20 p-10 hover:shadow-2xl '>

                    <div className='flex'>
                        <h1 className={`'poppins2 font-bold md:text-4xl text-2xl mb-4' ${!isAuthor || "text-blue-500 font-bold"}`}>SignUp</h1>
                        <img src="../assets/logo/webLogo.png" alt="logo" className='w-12 h-12' />
                    </div>

                    <input type="text" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='userName'
                        onChange={e => setUserName(e.target.value)}
                        value={userName}
                        required />

                    <input type="email" name="email" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='Email'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required />

                    <input type="password" name="password" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='Password'
                        onChange={e => SetPassword(e.target.value)}
                        value={password}
                        required />

                    <input type="password" className='w-full p-3 rounded-xl bg-gray-200
                        focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                        focus:shadow-xl m-2'
                        placeholder='Confirm Password'
                        onChange={e => SetConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required />

                    <div className='flex'>
                        <input type="checkbox" className='mb-3 ml-3 cursor-pointer w-4'
                            onClick={() => isAuthor ? setIsAuthor(false) : setIsAuthor(true)}
                        />
                        <label className={`mb-3 ml-2 font-mono ${!isAuthor || "text-blue-500 font-bold"}`}>Are You An Author?</label>
                    </div>

                    <button onClick={handleSubmit} className='w-full p-3 mb-1 bg-blue-400 text-white
                        rounded-xl hover:bg-blue-950 hover:shadow-xl' >Signup Now</button>

        

                    <Link to={Login}> <p className='font-mono tracking-widest text-lg
                    hover:text-blue-500 mt-3'>You Have Account?</p> </Link>

                </div>

            </div >

        </>
    )
}
//.........................................................................
