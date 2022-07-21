import { Typography, Avatar, Box } from '@mui/material';
import { getGravatarURL } from 'services/getGravatarURL';
import ReactTimeAgo from 'react-time-ago';

export default function CreationInfoTag({
    createdAt,
    creatorInfo: { email, level, username } = {},
    text = 'asked',
}) {
    return (
        <Box display='flex' alignItems='center'>
            <Avatar
                sx={{ width: 20, height: 20 }}
                src={getGravatarURL(email)}
            />
            <Typography display='inline' m={1}>
                {username}
            </Typography>
            <Typography display='inline'>
                <b>{level}</b>
            </Typography>
            <Typography display='inline' m={1} variant='body2'>
                {text}{' '}
                <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
            </Typography>
        </Box>
    );
}
