import { useEffect } from 'react'
import SignupComponents from '../../components/UserComponents/Signup/Signup.jsx';
import { useNavigate } from 'react-router-dom';
import { readerHome } from '../../util/constants.jsx';


function LoginPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'))
        if (user) {
            navigate(readerHome)
        }
    }, [])

    return (
        <div>
            <SignupComponents />
        </div>
    )
}

export default LoginPage;