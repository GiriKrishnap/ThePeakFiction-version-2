import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { changePasswordRequestAPI, editProfileAPI } from '../../../APIs/userAPI';
//.........................................................................

export default function ProfileComponent() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    let [userId, setUserId] = useState('');
    let [userName, setUserName] = useState('');
    let [email, setEmail] = useState('');
    let [isAuthor, setIsAuthor] = useState('');
    const [edit, setEdit] = useState(false);

    //.........................................................................

    useEffect(() => {
        getUserDetails();
    }, [])

    //.........................................................................

    const getUserDetails = async () => {
        let userDetails = JSON.parse(localStorage.getItem("user-login"))
        setUserId(userDetails.id)
        setUserName(userDetails.userName)
        setEmail(userDetails.email);
        setIsAuthor(userDetails.isAuthor)
    }

    //.........................................................................

    const handleEdit = async () => {
        if (edit === false) {
            setEdit(!edit)
        } else {
            try {

                const body = {
                    userId,
                    userName,
                    email
                }

                const response = await editProfileAPI(body);
                if (response.data.status) {

                    toast.success(response.data.message);

                    localStorage.removeItem("user-login");
                    navigate('/');

                } else {
                    toast.error(response.data.message);
                }
                setEdit(!edit)
            } catch (error) {
                console.log('catch error on handleEdit :: profile', error);
                toast.error(error.message);
            }
        }
    }

    //.........................................................................

    const handleChangePassword = async () => {
        try {

            const body = {
                email: email
            }

            const response = await changePasswordRequestAPI(body);
            if (response.data.status) {

                toast.success('Check Your Mail', { icon: "😼✉" })
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message)
            console.log('catch error frontEnd :: handleChangePassword - ', error)
        }
    }

    //.........................................................................

    return (

        <>
            {
                userName ?
                    <div className='justify-center poppins2 md:w-80 w-full flex flex-col'>
                        <div className=''>

                            <p>User Name</p>
                            <input type="text" value={userName} disabled={!edit}
                                className='p-2 pl-5 m-1 rounded-2xl text-gray-300 w-full'
                                onChange={(e) => setUserName(e.target.value)} />

                            <p>Email</p>
                            <input type="text" value={email} disabled={!edit}
                                className='p-2 pl-5 m-1 rounded-2xl  text-gray-300 w-full'
                                onChange={(e) => setEmail(e.target.value)} />

                            <p>Role</p>
                            <input type="text" value={isAuthor ? 'Author' : 'Reader'} disabled
                                className='p-2 pl-5 m-1 rounded-2xl  text-gray-300 w-full' />
                            <br />

                            <button className='bg-blue-600 p-2 mt-5 
                            rounded-2xl w-full hover:bg-blue-800'
                                onClick={handleEdit}>
                                Edit Profile
                            </button>

                            <p className='text-center mt-3 underline text-gray-300 cursor-pointer'
                                onClick={handleChangePassword}>Change Password</p>
                        </div>

                    </div> : ''
            }
        </>
    )
}
//.........................................................................

