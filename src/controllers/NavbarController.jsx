import React from 'react';
import { useUser } from '../contexts';
import { Navbar } from '../components';

export default function NavbarController() {
    const { setUserData } = useUser();

    function onLogoutClick() {
        setUserData(() => ({}));
    }

    return <Navbar onClick={onLogoutClick} />;
}
