import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Box,
} from '@mui/material';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';
import Logo from 'assets/bdpa-logo.svg';
import { SearchBar } from 'components';
export default function Navbar({ logout, userData }) {
    function NavbarControls() {
        return userData.username ? (
            <>
                <Typography variant="button">Level: <b> {userData.level}    &nbsp; </b> Points: <b> {userData.points}</b></Typography>
                <Button
                    color='inherit'
                    component={Link}
                    to='/mail'
                >
                    Mail
                </Button>
                <Button
                    color='inherit'
                    component={Link}
                    to='/dashboard'
                >
                    Account
                </Button>
                <Button
                    color='inherit'
                    onClick={logout}
                >
                    Logout
                </Button>
                <IconButton component={Link} to='/'>
                    <Gravatar size={40} email={userData.email} />
                </IconButton>
            </>
        ) : (
            <>
                <Button
                    color='inherit'
                    component={Link}
                    to='/users/login'
                    
                >
                    Login
                </Button>
                <Button
                    color='inherit'
                    component={Link}
                    to='/users/register'
                    
                >
                    Register
                </Button>
            </>
        );
    }
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton component={Link} to='/'>
                    <img src={Logo} alt='bdpa logo' width='40' height='40' />
                </IconButton>
                <Typography variant='h6' component='div'>
                    qOverflow
                </Typography>
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                <NavbarControls />
            </Toolbar>
        </AppBar>
    );
}
