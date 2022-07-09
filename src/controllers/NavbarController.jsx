import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts';
import { Navbar } from '../components';

export default function NavbarController() {
    const navigate = useNavigate();
    const { setUserData } = useUser();

    function onLogoutClick() {
        setUserData(() => ({}));
        navigate('/login');
    }

    return <Navbar onClick={onLogoutClick} />;
}
