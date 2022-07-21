import { Typography, IconButton, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { getGravatarURL } from 'services/getGravatarURL';

export default function Profile({ userData }) {
    return (
        <>
            <IconButton component={Link} to='/dashboard'>
                <Avatar size={40} src={getGravatarURL(userData.email)} />
            </IconButton>
            <Typography variant='body1'>
                <b>{userData.level}</b> - {userData.points}
            </Typography>
        </>
    );
}
