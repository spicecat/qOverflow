import { IconButton, Typography } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

export default function Profile({ userData: { badges, email, level, points } }) {
    
    return (
        <>
            <IconButton component={Link} to='/dashboard'>
                <Gravatar email={email} size={20} style={{ borderRadius: '100%' }} />
            </IconButton>
            <Typography variant='body1'>
                <b>{level}</b> - {points}
            </Typography>
        </>
    );
}
