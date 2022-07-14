import { Typography } from '@mui/material';
import Gravatar from 'react-gravatar';
import ReactTimeAgo from 'react-time-ago';

export default function CreationInfoTag({
    createdAt,
    creatorInfo: {
        email,
        level,
        username
    } = {},
    text = 'asked'
}) {
    return (
        <div style={{ textAlign: 'right' }}>
            <Gravatar email={email} size={20} style={{ borderRadius: '15%' }} />
            <Typography display='inline' m={1}>
                {username}
            </Typography>
            <Typography display='inline'>
                <b>Level {level}</b>
            </Typography>
            <Typography display='inline' m={1} variant='body2'>
                {text} <ReactTimeAgo date={createdAt} locale='en-US' />
            </Typography>
        </div>
    );
}
