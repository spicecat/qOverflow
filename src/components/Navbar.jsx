import { Link } from 'react-router-dom'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useUser } from '../contexts'
// import HomeIcon from '@mui/icons-material/Home'

export default function Navbar() {
    const { username } = useUser()

    return (
        <AppBar position='static'>
            <Toolbar variant='dense'>
                <IconButton color='inherit' className='menu-button' component={Link} to='/' >
                    {/* <HomeIcon /> */}
                </IconButton>
                &nbsp;
                <Typography>TODO: page</Typography>
                <>
                    <Button color='inherit' variant='outlined' size='small' to='/' component={Link}>Home</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/explorer' component={Link}>Explorer</Button>&nbsp;
                    <Button color='inherit' variant='outlined' size='small' to='/login' component={Link}>Login</Button>&nbsp;
                </>
            </Toolbar>
        </AppBar>
    )
}