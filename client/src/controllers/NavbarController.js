import { useUser, useError } from 'contexts';
import { Navbar } from 'components';
import { logout } from 'services/userServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function NavbarController() {
    const { userData, setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const logoutUser = async () => {
        const { error } = await logout();
        console.log(error, 3213)
        if (error) {
            setError(error);
        }
        Cookies.remove('token');
        setUserData({});
        navigate('/users/login');
    };

    return Navbar({ logout: logoutUser, userData });
}
