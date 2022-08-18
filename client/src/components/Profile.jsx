import { IconButton, Typography } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

export default function Profile({ userData: { badgeCount, email, level, points } }) {
    console.log(badgeCount, email, 123123)
    return (
        <>
            <IconButton component={Link} to='/dashboard'>
                <Gravatar email={email} size={20} style={{ borderRadius: '100%' }} />
            </IconButton>
            <Typography variant='body1'>
                <b>{level}</b> – {points} {badgeCount?.gold}/{badgeCount?.silver}/{badgeCount?.bronze}
            </Typography>
        </>
    );
}
