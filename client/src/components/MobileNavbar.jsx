import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import {
    AppBar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

import Logo from 'assets/bdpa-logo.svg';

export default function MobileNavbar({ logout, userData, open, setOpen, mode, setMode }) {
    function ControlButtons() {
        return userData.username ? (
            <>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/dashboard'>
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
                    <ListItemButton disabled />
                    <ListItemText>
                        <Typography display='inline'><b>{userData?.level}</b></Typography>
                        <Typography display='inline' m={1}>{userData?.points}</Typography>
                        <Typography color='#ffd700' display='inline'>{userData?.badgeCount?.gold}</Typography>
                        /<Typography color='#c0c0c0' display='inline'>{userData?.badgeCount?.silver}</Typography>
                        /<Typography color='#cd7f32' display='inline'>{userData?.badgeCount?.bronze}</Typography>
                    </ListItemText>
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
                    <ListItemButton color='inherit' component={Link} to='/users/login'>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <ListItemButton color='inherit' component={Link} to='/users/register'>
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
                <IconButton component={Link} to='/' sx={{ margin: '0 1vw 0 0 ' }}>
                    <img src={Logo} alt='bdpa logo' width='40' height='40' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    qOverflow
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Button color='inherit' onClick={setOpen}>
                    Menu
                </Button>
            </Toolbar>
            <Drawer anchor='right' open={open} onClose={setOpen}>
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to='/questions/search'>
                            <ListItemIcon>
                                <SearchIcon />
                            </ListItemIcon>
                            <ListItemText>Search</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ControlButtons />
                    <ListItem>
                        <ListItemButton onClick={setMode}>
                            <ListItemIcon>
                                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
                            </ListItemIcon>
                            <ListItemText>
                                Switch to {mode === 'light' ? 'dark' : 'light'} mode
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </AppBar>
    );
}
