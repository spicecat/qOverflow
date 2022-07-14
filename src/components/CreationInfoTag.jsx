import { Typography } from '@mui/material';
import Gravatar from 'react-gravatar';
import ReactTimeAgo from 'react-time-ago';

export default function CreationInfoTag({
    createdAt,
    creatorInfo: {
        email,
        level,
        username
    } = {}
}) {
    return (
        <div style={{ textAlign: 'right' }}>
            <Gravatar email={email} size={20} style={{ borderRadius: '15%' }} />
            <Typography display='inline' margin={1}>
                {username}
            </Typography>
            <Typography display='inline'>
                <b>Level {level}</b>
            </Typography>
            <Typography display='inline' margin={1} variant='body2'>
                <ReactTimeAgo date={createdAt} locale='en-US' />
            </Typography>
        </div>
    );
}
