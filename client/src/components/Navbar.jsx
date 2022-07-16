import { Link } from 'react-router-dom';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Box,
} from '@mui/material';
import Logo from '../assets/bdpa-logo.svg';
import { SearchBar } from '.';
import Gravatar from 'react-gravatar';

export default function Navbar({ logout, userData }) {
    function ButtonGroup() {
        return userData.username ? (
            <>
                <Button color='inherit' component={Link} to='/mail'>
                    Mail
                </Button>
                <Button color='inherit' component={Link} to='/dashboard'>
                    Account
                </Button>
                <Button color='inherit' onClick={logout}>
                    Logout
                </Button>
                <IconButton component={Link} to='/'>
                    <Gravatar size={40} email={userData.email} />
                </IconButton>
            </>
        ) : (
            <>
                <Button color='inherit' component={Link} to='/login'>
                    Login
                </Button>
                <Button color='inherit' component={Link} to='/register'>
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
                <ButtonGroup />
            </Toolbar>
        </AppBar>
    );
}
