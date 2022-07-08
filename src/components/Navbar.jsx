import React from 'react';
import { Link } from 'react-router-dom';

import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';

import Logo from '../assets/bdpa-logo.svg';
import { useUser } from '../contexts';
import { SearchBar } from './index';

export default function Navbar() {
    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    const { username } = useUser();

    function ButtonGroup({ username }) {
        if (username) {
            return (
                <React.Fragment>
                    <Button color='inherit'>
                        <Link to='/update' style={linkStyle}>
                            Account
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/login' style={linkStyle}>
                            Logout
                        </Link>
                    </Button>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Button color='inherit'>
                        <Link to='/login' style={linkStyle}>
                            Login
                        </Link>
                    </Button>
                    <Button color='inherit'>
                        <Link to='/register' style={linkStyle}>
                            Register
                        </Link>
                    </Button>
                </React.Fragment>
            );
        }
    }

    

    //add sign out bar once user logged in

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    color='inherit'
                    className='menu-button'
                    component={Link}
                    to='/'
                >
                    <img src={Logo} alt='bdpa logo' width='20' height='20' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    qOverflow
                </Typography>
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                <ButtonGroup username={username} />
            </Toolbar>
        </AppBar>
    );
}
