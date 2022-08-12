import { useMediaQuery } from '@mui/material';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MobileNavbar, Navbar } from 'components';
import { useMode, useUser } from 'contexts';
import { logout } from 'services/userServices';

export default function NavbarController() {
    const navigate = useNavigate();
    const { userData, setUserData } = useUser();
    const { mode, setMode } = useMode();

    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((initial) => !initial);

    const toggleMode = () => {
        setMode(() => (mode === 'light' ? 'dark' : 'light'));
    };

    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

    const logoutUser = async () => {
        await logout();
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
