import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import Logo from 'assets/bdpa-logo.svg';
import { useState } from 'react';
import Gravatar from 'react-gravatar';
import { useMode } from 'contexts';

export default function MobileNavbar({ logout, userData }) {
    const [open, setOpen] = useState(false);
    const { mode, setMode } = useMode();

    const handleClick = () => setOpen((initial) => !initial);

    const onClick = () => {
        setMode(() => (mode === 'light' ? 'dark' : 'light'));
    };

    function NavbarControls() {
        return userData.username ? (
            <>
                <ListItem>
                    <ListItemButton
                        color='inherit'
                        component={Link}
                        to='/dashboard'
                    >
                        <ListItemIcon>
                            <Gravatar
                                email={userData.email}
                                size={20}
                                style={{ borderRadius: '100%' }}
                            />
                        </ListItemIcon>
                        <ListItemText>Dashboard</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/mail'>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText>Mail</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color='inherit'
                        component={Link}
                        to='/users/login'
                        onClick={logout}
                    >
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItemButton>
                </ListItem>
            </>
        ) : (
            <>
                <ListItem>
                    <ListItemButton
                        color='inherit'
                        component={Link}
                        to='/users/login'
                    >
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton
                        color='inherit'
                        component={Link}
                        to='/users/register'
                    >
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </ListItemButton>
                </ListItem>
            </>
        );
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    component={Link}
                    to='/'
                    sx={{ margin: '0 1vw 0 0 ' }}
                >
                    <img src={Logo} alt='bdpa logo' width='40' height='40' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    qOverflow
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Button color='inherit' onClick={handleClick}>
                    Menu
                </Button>
            </Toolbar>
            <Drawer anchor='right' open={open} onClose={handleClick}>
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to='/questions/search'>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText>Search</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <NavbarControls />
                    <ListItem>
                        <ListItemButton onClick={onClick}>
                            <ListItemIcon>
                                {mode === 'light' ? (
                                    <DarkModeIcon />
                                ) : (
                                    <LightModeIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText>
                                Switch to {mode === 'light' ? 'dark' : 'light'}{' '}
                                mode
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
}
