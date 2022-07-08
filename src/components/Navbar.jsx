import { Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useUser } from '../contexts'
import Logo from '../assets/bdpa-logo.svg'

export default function Navbar() {
    const { username } = useUser()

    

    //add sign out bar once user logged in

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className='menu-button' component={Link} to='/' >
                    <img src={Logo} alt='bdpa logo' width='20' height='20'/>
                </IconButton>
                <Button color='inherit' variant='outlined' size='small' to='/users/login' component={Link}>Log in</Button>&nbsp;
                <Button color='inherit' variant='outlined' size='small' to='/users/signup' component={Link}>Sign up</Button>&nbsp;
                
            </Toolbar>
        </AppBar >
    )
}