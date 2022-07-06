import { Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useUser } from '../contexts'
import BDPALogo from '../assets/bdpa-logo.svg'

export default function Navbar() {
    const { username } = useUser()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className='menu-button' component={Link} to='/' >
                    <img src={BDPALogo} alt='bdpa logo' width='20' height='20' />
                </IconButton>
                <Button color='inherit' variant='outlined' size='small' to='/users/login' component={Link}>Log in</Button>&nbsp;
                <Button color='inherit' variant='outlined' size='small' to='/users/signup' component={Link}>Sign up</Button>&nbsp;
            </Toolbar>
        </AppBar >
    )
}