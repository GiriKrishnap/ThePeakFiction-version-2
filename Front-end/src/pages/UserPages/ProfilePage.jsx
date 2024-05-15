import { Suspense, lazy, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
//.....................................................................................
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
const ProfileComponents = lazy(() => import('../../components/UserComponents/profile/profile.jsx'));
const WalletComponents = lazy(() => import('../../components/UserComponents/profile/wallet.jsx'));
//.....................................................................................
const stripePromise = loadStripe(process.env.REACT_APP_STRIP_PUBLISHER_KEY);
//.....................................................................................


function HomePage() {

    //.....................................................................................

    const [isProfile, setIsProfile] = useState(true);

    //.....................................................................................

    return (


        <>
            <HeaderComponents />

            <div className=' m-1 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                          from-gray-600 via-gray-700 to-gray-800 md:p-10 pt-10 flex flex-col gap-2'>

                <p className='text-center text-4xl poppins2 text-white select-none cursor-pointer'
                    onClick={() => setIsProfile(!isProfile)}>

                    {
                        isProfile ?
                            <>Profile <i className="fa-solid text-blue-500 fa-user"></i></>
                            : <>Wallet <i className="fa-solid fa-wallet text-blue-500"></i></>
                    }

                </p>

                <small className='text-center text-gray-300 font-mono'>
                    Tap the title to switch to your <b className='text-blue-500'>{isProfile ? "wallet." : "profile."}</b>
                </small>

                {/* .........MAIN PROFILE AND WALLET PART...... */}
                <div className='md:p-5 p-10 mb-32 md:mb-8 mt-14 md:mt-5 md:pb-0 flex justify-center text-white'>
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center min-h-screen p-5 min-w-screen">

                                <div className="flex space-x-2 animate-pulse">
                                    <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                                    <div className="w-4 h-4 bg-gray-100 rounded-full"></div>
                                </div>

                            </div>
                        }>

                        {
                            isProfile ?
                                <ProfileComponents /> :

                                <Elements stripe={stripePromise}>
                                    <WalletComponents />
                                </Elements>
                        }

                    </Suspense >

                </div>
                {/* .........MAIN PROFILE AND WALLET PART END...... */}

            </div>


            <FooterComponents />

        </>

    )
}

export default HomePage;
//.....................................................................................
