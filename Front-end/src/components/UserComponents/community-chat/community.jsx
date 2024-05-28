import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCommunityAPI } from '../../../APIs/userAPI';
import { chatPageUrl } from '../../../util/constants';
import toast from 'react-hot-toast';
//.........................................................................


export default function Community() {

    //.........................................................................


    const navigate = useNavigate();

    //.........................................................................

    const [community, setCommunity] = useState([]);

    //.........................................................................

    const getCommunity = async () => {
        try {

            const userId = JSON.parse(localStorage.getItem("user-login")).id
            const response = await getCommunityAPI(userId);

            if (response.data.status) {
                setCommunity(response.data.community.community);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    //.........................................................................

    useEffect(() => {
        getCommunity();
        console.log(community)
    }, []);
    //.........................................................................

    const handleCommunityClick = (novelId) => {
        navigate(`${chatPageUrl}?novelId=${novelId}`);

    }
    //.........................................................................

    return (
        <>

            <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-gray-600 via-gray-700 to-gray-800 poppins2 p-1 md:p-10 m-1 rounded-lg text-white min-h-96'>


                <p className='text-center font-mono mb-1 text-xl pt-5'>All Joined Community</p>

                <div className='max-h-96 md:m-10 pt-5 overflow-y-scroll'>

                    <div className='w-full h-full pr-2 pl-2 '>
                        {community.length > 0 ||
                            <p className='text-2xl text-center text-gray-400 mt-10'>
                                Didn't Joined any Community yet.</p>}

                        {
                            community.map((item) => (

                                <div className='h-20 bg-gray-600 rounded-2xl mb-3 flex overflow-hidden
                                shadow-black shadow-lg hover:bg-gray-700 cursor-pointer'
                                    key={item.name}
                                    onClick={() => handleCommunityClick(item.novel_id)}>

                                    <div className='flex flex-col place-content-center ml-10'>
                                        <p className='text-sm md:text-2xl'>{item.name}</p>
                                        <p className='text-xs md:text-sm font-mono text-gray-400 ml-1'>
                                            official Community
                                        </p>
                                    </div>
                                </div>
                            ))
                        }


                    </div>

                </div>

            </div >

        </>
    )
}
//............................................................................
