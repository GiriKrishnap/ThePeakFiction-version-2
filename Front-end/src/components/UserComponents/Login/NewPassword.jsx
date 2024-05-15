
import  { useEffect, useState } from 'react'
import './Login.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { changePasswordAPI } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function NewPassword() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();

    //.........................................................................

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //.........................................................................

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        if (!token) {
            toast.error('No Token');
            navigate(-1);
        } else {
            setToken(token);
        }

    }, [])
    //.........................................................................


    const handleSubmit = async (e) => {
        try {

            if (!password || !confirmPassword) {
                toast.error('Fill the Field');
            } else if (password.length < 4) {
                toast.error('password should have \n minimum 4 characters');
            } else if (password !== confirmPassword) {
                toast.error('The password and confirm password \n should be the same.');
            } else {

                const body = {
                    token,
                    password
                }
                const response = await changePasswordAPI(body);

                if (response.data.status) {
                    toast.success(response.data.message)
                    localStorage.removeItem("user-login");
                    navigate('/');
                } else {
                    toast.error(response.data.message)
                }
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //.........................................................................

    return (
        <>

            <div className='h-screen flex justify-center place-items-center text-black'>

                <div className='md:w-1/2 w-full m-10 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                      flex flex-col justify-center place-items-center md:p-40 p-20'>

                    <p className='poppins2 md:text-3xl text-2xl'>
                        New Password <i className="fa-solid text-blue-700 fa-lock"></i>
                    </p>

                    <small className='text-gray-400 mt-2 font-mono'>
                        give us your new password Boi!
                    </small>

                    <input type="password" name="password" className='w-full p-2 mt-8 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)} value={password} maxLength={8}
                        required />

                    <input type="password" className='w-full p-2 mt-3 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold'
                        placeholder='Confirm Password'
                        onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} maxLength={8}
                        required />

                    <button className='w-full p-2 mt-8 bg-blue-400 text-white
                        rounded-xl hover:bg-blue-600' onClick={handleSubmit}>
                        Confirm
                    </button>

                </div>

            </div>

        </>
    )
}
//.........................................................................
