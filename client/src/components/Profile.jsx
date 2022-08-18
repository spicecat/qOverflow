import { IconButton, Typography } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Link } from 'react-router-dom';

export default function Profile({ userData: { badgeCount, email, level, points } }) {
    return (
        <>
            <IconButton component={Link} to='/dashboard'>
                <Gravatar email={email} size={20} style={{ borderRadius: '100%' }} />
            </IconButton>
            <Typography>
                <b>{level}</b>
                <Typography display='inline' m={1}>{points}</Typography>
                <Typography color='#ffd700' display='inline'>{badgeCount?.gold}</Typography>
                /<Typography color='#c0c0c0' display='inline'>{badgeCount?.silver}</Typography>
                /<Typography color='#cd7f32' display='inline'>{badgeCount?.bronze}</Typography>
            </Typography>
        </>
    );
}
