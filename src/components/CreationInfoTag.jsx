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
        <Typography textAlign='right'>
            <Gravatar size={20} email={email} />
            <Typography display='inline' margin={1}>
                {username}
            </Typography>
            <Typography display='inline'>
                Level {level}
            </Typography>
            <Typography display='inline' margin={1} variant='body2'>
                <ReactTimeAgo date={createdAt} locale='en-US' />
            </Typography>
        </Typography>
    );
}
