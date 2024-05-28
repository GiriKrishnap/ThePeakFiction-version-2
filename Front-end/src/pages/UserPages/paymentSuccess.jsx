import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPaymentUrl, profileUrl } from '../../util/constants';
import axios from '../../util/axios'
import toast from 'react-hot-toast';
//.........................................................................

function PaymentSuccess() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();


    //.........................................................................

    const updateWallet = async (sessionId, userId) => {
        try {
            const body = JSON.stringify({
                sessionId,
                userId
            })

            const res = await axios.post(confirmPaymentUrl, body, { headers: { "Content-Type": "application/json" } })
            if (res.data.status) {
                toast.success(res.data.message);
            } else {
                toast.error('there is error');
            }

        } catch (error) {
            console.log('error on wallet update client side - ', error.message);
        }
    }

    //.........................................................................

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('sessionId');
        const userId = JSON.parse(localStorage.getItem("user-login")).id

        if (!sessionId || !userId) {
            navigate(profileUrl);
        } else {
            updateWallet(sessionId, userId)
        }

    }, [])

    //.........................................................................



    return (
        <>

            <div className="grid h-screen place-content-center bg-blue-500 px-4 dark:bg-gray-900">
                <h1 className="uppercase tracking-widest text-green-400 font-medium text-3xl cursor-pointer">Payment Success</h1>
                <h1 className="uppercase tracking-widest text-blue-400 font-medium text-2xl cursor-pointer"
                    onClick={() => navigate(profileUrl)}>back to profile</h1>
            </div>

        </>
    )
}

export default PaymentSuccess