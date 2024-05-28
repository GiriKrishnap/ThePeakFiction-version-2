import  { useEffect, useState } from 'react'
import { login, signup } from '../../util/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resendOtpAPI, verifyOtpPostAPI } from '../../APIs/userAPI';

//.........................................................................

export default function VerifyOtp() {

    //.........................................................................

    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [timer, setTimer] = useState(60);

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();

    //.........................................................................

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if (!email) {
            navigate(signup);
        } else {
            setEmail(email);
        }
    }, []);

    //.........................................................................

    const handleSubmit = async () => {
        try {
            if (otp.length < 4) {

                toast.error("OTP should be 4 digit", {
                    icon: '😿', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })

            } else {

                const body = JSON.stringify({
                    otp,
                    email
                });

                const response = await verifyOtpPostAPI(body);

                if (response.data.status) {
                    toast.error(response.data.message, {
                        icon: '😼✔', style: {
                            borderRadius: '30px',
                            background: '#444',
                            color: '#fff',
                        },
                    })
                    navigate(login);
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
        } catch (error) {
            console.log('catch error on handleSubmit - verifyPage ', error);
            toast.error(error.message);
        }
    }


    //.........................................................................

    const handleResentOtp = async (email) => {
        try {

            if (disabled) {
                toast.error(`Please wait ${timer} sec`, { icon: '😼⏳' });

            } else {

                setDisabled(true);
                setTimer(60);

                const countdown = setInterval(() => {
                    setTimer(prevTimer => prevTimer - 1);
                }, 1000);

                setTimeout(() => {
                    clearInterval(countdown);
                    setDisabled(false);
                }, 60000);


                const response = await resendOtpAPI(email);
                if (response.data.status) {
                    toast.success(response.data.message, { icon: '😼✉' });
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('catch err :: handleResentOtp')
        }
    }
    //.........................................................................

    useEffect(() => {

        setDisabled(true);
        setTimer(60);

        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countdown);
            setDisabled(false);
        }, 60000);

    }, []);


    //.........................................................................


    return (
        <>
            <div className='h-screen flex justify-center place-items-center text-black'>

                <div className='md:w-1/2 w-full m-10 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                flex flex-col justify-center place-items-center md:p-40 p-20'>

                    <p className='poppins2 md:text-3xl text-2xl font-bold'>Email Verification <i className="fa-solid fa-fingerprint"></i> </p>
                    <small className='text-gray-400 mt-2 font-mono'>
                        we have send a code to your email
                    </small>

                    <input type="text" className='w-full p-3 mt-8 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold'
                        onChange={(e) => setOtp(e.target.value)} maxLength={4} placeholder='enter_otp'
                    />

                    <button className='w-full p-3 mt-3 bg-blue-400 text-white
                    rounded-xl hover:bg-blue-600' onClick={handleSubmit}>
                        Verify
                    </button>

                    <small className='mt-4 text-slate-500 tracking-widest font-mono cursor-pointer
                    hover:tracking-wide hover:text-blue-500'
                        onClick={() => handleResentOtp(email)} disabled={disabled}>
                        {disabled ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}
                    </small>

                </div>

            </div>
        </>
    )
}

//.........................................................................
