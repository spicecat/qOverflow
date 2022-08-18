import { Chip, Typography } from '@mui/material';
export default function ListQuestionInfo({ answers, downvotes, inline, hasAcceptedAnswer, tags, upvotes, views }) {
    return inline ? (
        <>
            <Typography display='inline'>{upvotes - downvotes} votes | </Typography>
            <Typography display='inline'>{answers} answers | </Typography>
            <Typography display='inline'>{views} views</Typography>
            <Typography display='inline' m={1}>
                Accepted:
            </Typography>
            <Chip
                color={hasAcceptedAnswer ? 'success' : 'error'}
                label={hasAcceptedAnswer ? 'yes' : 'no'}
                size='small'
            />
            <Typography display='inline' m={1}>Tags: {tags.join(', ')}</Typography>
        </>
    ) : (
        <>
            <Typography display='block'>{upvotes - downvotes} votes</Typography>
            <Typography display='block'>{answers} answers</Typography>
            <Typography display='block'>{views} views</Typography>
            <Typography display='block'>
                Accepted: <Chip
                    color={hasAcceptedAnswer ? 'success' : 'error'}
                    label={hasAcceptedAnswer ? 'yes' : 'no'}
                    size='small'
                />
            </Typography>
            <Typography display='block'>Tags: {tags.join(', ')}</Typography>
        </>
    )
}