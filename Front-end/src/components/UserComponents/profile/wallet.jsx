
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { getWalletAPI } from '../../../APIs/userAPI';
//.........................................................................

export default function WalletComponent() {

    //.........................................................................
    const [isAddMoney, setIsAddMoney] = useState(false);
    const [isAddHistory, setIsAddHistory] = useState(false);
    const [isSpendHistory, setIsSpendHistory] = useState(false);
    const [walletDetails, setWalletDetails] = useState({});

    //.........................................................................

    const fetchGetWallet = async () => {
        try {

            const response = await getWalletAPI();
            if (response.data.status) {
                setWalletDetails(response.data.walletDetails);
                console.log(response.data.walletDetails)
            } else {
                toast.error("status is false");
            }
        } catch (error) {
            console.log('error on fetchGetWallet', error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    useEffect(() => {

        fetchGetWallet();

    }, [])

    //.........................................................................


    const makePayment = async (givenAmount) => {
        const stripe = await loadStripe(import.meta.env.VITE_APP_STRIP_PUBLISHER_KEY);

        const body = {
            amount: givenAmount
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:4000/create-payment-intent", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }

    //.........................................................................

    const handleSwitches = (name) => {

        if (name === 'addMoney') {
            setIsAddMoney(!isAddMoney);
            setIsAddHistory(false);
            setIsSpendHistory(false);
        } else if (name === 'addHistory') {
            setIsAddHistory(!isAddHistory);
            setIsAddMoney(false);
            setIsSpendHistory(false);
        } else {
            setIsSpendHistory(!isSpendHistory);
            setIsAddHistory(false);
            setIsAddMoney(false);
        }
    }



    //.........................................................................

    return (

        <>
            <div className='bg-gray-800 rounded-3xl drop-shadow-md mb-11'>

                <div className='bg-blue-500 hover:bg-blue-600 min-w-80 p-6 rounded-3xl
                 flex flex-col justify-center place-items-center gap-2 drop-shadow-md'>
                    <small className='poppins2 md:text-lg text-xs'>Total Balance</small>
                    <p className='poppins2 text-4xl font-bold'>
                        <i className="fa-solid fa-indian-rupee-sign"></i> {walletDetails.walletAmount}</p>
                </div>

                <div className='p-10 text-2xl flex justify-center gap-10 select-none'>
                    {/* ................ADD MONEY............. */}

                    <i className="fa-solid fa-square-plus fa-xl md:fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:-rotate-6 hover:text-gray-600"
                        onClick={() => handleSwitches('addMoney')} ></i>

                    <i className="fa-solid fa-list-ul fa-xl md:fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:rotate-6 hover:text-gray-600"
                        onClick={() => handleSwitches('addHistory')}></i>

                    <i className="fa-solid fa-hand-holding-dollar fa-xl md:fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:rotate-6 hover:text-gray-600"
                        onClick={() => handleSwitches()}></i>

                </div>

                {
                    !isAddMoney ||
                    <div className='text-center font-mono select-none'>
                        <small className='text-gray-300 md:text-lg text-xs'>please select your value</small>
                        <div className='flex gap-3 duration-700
                             bg-gray-700 rounded-b-3xl w-full h-24 drop-shadow-md p-5 poppins2'>

                            <button className='bg-blue-300 p-3 rounded-lg grow hover:scale-105 md:text-lg text-xs'
                                onClick={() => makePayment(10)}>
                                + 10rs
                            </button>
                            <button className='bg-blue-400 p-3 rounded-lg grow hover:scale-105 md:text-lg text-xs'
                                onClick={() => makePayment(15)}>
                                + 15rs
                            </button>
                            <button className='bg-blue-500 p-3 rounded-lg grow hover:scale-105 md:text-lg text-xs'
                                onClick={() => makePayment(20)}>
                                + 20rs
                            </button>
                            <button className='bg-blue-600 p-3 rounded-lg grow hover:scale-105 md:text-lg text-xs'
                                onClick={() => makePayment(50)}>
                                + 50rs
                            </button>

                        </div>
                    </div>

                }

                {
                    !isAddHistory ||

                    <div className='text-center font-mono select-none'>
                        <small className='text-gray-300'>Your Add History</small>
                        <div className='flex flex-col gap-3 max-h-72 duration-700 overflow-y-scroll
                         bg-gray-700 rounded-b-3xl w-full drop-shadow-md p-3 poppins2'>

                            {
                                walletDetails.amountAdd.map((item) => (

                                    <div className='bg-gray-400 min-h-16 rounded-xl flex place-items-center
                                    gap-5 pl-4 pr-4 poppins2' key={item._id}>
                                        <div className='grow text-left'>
                                            <p className='md:text-5xl text-2xl text-green-300'>+{item.amount}</p>
                                        </div>
                                        <div className='text-right md:text-lg text-xs'>

                                            {
                                                item.novel_title ?
                                                    <p className='text-xs'>from {item.novel_title}</p> :
                                                    <p>Added to wallet</p>
                                            }

                                            <p className='text-gray-200 font-mono md:text-sm text-xs'>
                                                {new Date(item.date).toLocaleDateString("en-GB")} - {new Date(item.date)
                                                    .toLocaleTimeString('en-GB', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            {walletDetails.amountAdd.length > 0 ||
                                <p className='mt-2 text-gray-400'>No History</p>}


                        </div>
                    </div>
                }


                {
                    !isSpendHistory ||


                    <div className='text-center font-mono select-none'>
                        <small className='text-gray-300'>Your Spend History</small>
                        <div className='flex flex-col gap-3 duration-700 overflow-y-scroll
                         bg-gray-700 rounded-b-3xl w-full max-h-72 drop-shadow-md p-5 poppins2'>

                            {
                                walletDetails.amountUse.map((item) => (

                                    <div className='bg-gray-400 min-h-16 rounded-xl flex place-items-center
                                    gap-5 pl-4 pr-4 poppins2' key={item._id}>
                                        <div className='text-left'>
                                            <p className='md:text-5xl text-2xl text-red-300'>-{item.amount}</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='md:text-sm text-xs'>Spend on {item.novelName} chap-{item.chapterNo}</p>
                                            <p className='text-gray-200 font-mono text-xs'>
                                                {new Date(item.date).toLocaleDateString("en-GB")} - {new Date(item.date)
                                                    .toLocaleTimeString('en-GB', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            {walletDetails.amountUse.length > 0 ||
                                <p className='mt-2 text-gray-400'>No History</p>}


                        </div>
                    </div>
                }


            </div>
        </>
    )
}
//.........................................................................