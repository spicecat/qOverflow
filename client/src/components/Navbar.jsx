import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
    Box,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import Logo from 'assets/bdpa-logo.svg';
import { ModeToggle, Profile } from 'components';
import { SearchBar } from 'controllers';

export default function Navbar({ logout, userData }) {
    function NavbarControls() {
        return userData.username ? (
            <>
                <IconButton
                    color='inherit'
                    component={Link}
                    to='/mail'
                    sx={{ margin: '0 1vh' }}
                >
                    <MailIcon />
                </IconButton>
                <Profile userData={userData} sx={{ margin: '1vh 1vh' }} />
                <Button
                    color='inherit'
                    component={Link}
                    to='/login'
                    onClick={logout}
                    sx={{ margin: '0 1vh' }}
                >
                    Logout
                </Button>
            </>
        ) : (
            <>
                <Button color='inherit' component={Link} to='/users/login'>
                    Login
                </Button>
                <Button color='inherit' component={Link} to='/users/register'>
                    Register
                </Button>
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
                <SearchBar />
                <Box sx={{ flexGrow: 1 }} />
                <ModeToggle />
                <NavbarControls />
            </Toolbar>
        </AppBar>
    );
}
