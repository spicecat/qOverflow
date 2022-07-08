import React from 'react';
import { Link } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import Logo from '../assets/bdpa-logo.svg';
import { useUser } from '../contexts';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '25vw',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const SearchBar = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('xs')]: {
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

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
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <SearchBar placeholder='Search…' />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <ButtonGroup username={username} />
            </Toolbar>
        </AppBar>
    );
}
