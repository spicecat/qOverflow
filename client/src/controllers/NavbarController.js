import { useUser, useError, useMode } from 'contexts';
import { Navbar, MobileNavbar } from 'components';
import { logout } from 'services/userServices';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';

export default function NavbarController() {
    const navigate = useNavigate();
    const { userData, setUserData } = useUser();
    const { mode, setMode } = useMode();
    const { setError } = useError();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((initial) => !initial);

    const toggleMode = () => {
        setMode(() => (mode === 'light' ? 'dark' : 'light'));
    };

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
        ? Navbar({ logout: logoutUser, userData, mode, setMode: toggleMode })
        : MobileNavbar({
              logout: logoutUser,
              userData,
              open,
              setOpen: toggleOpen,
              mode,
              toggleMode,
          });
}
