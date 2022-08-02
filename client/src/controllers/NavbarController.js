import { useUser, useError } from 'contexts';
import { Navbar, MobileNavbar } from 'components';
import { logout } from 'services/userServices';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';

export default function NavbarController() {
    const { userData, setUserData } = useUser();
    const { setError } = useError();
    const navigate = useNavigate();

    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

    const logoutUser = async () => {
        const { error } = await logout();
        if (error) {
            setError(error);
        }
        Cookies.remove('token');
        setUserData({});
        navigate('/users/login');
    };

    return md || sm
        ? Navbar({ logout: logoutUser, userData })
        : MobileNavbar({ logout: logoutUser, userData });
}
