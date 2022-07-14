import { Box, Chip, List, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CommentsList, CreationInfoTag, VoteControl } from '../controllers';

const statusColor = (status) => {
    switch (status) {
        case 'open': return 'primary';
        case 'protected': return 'secondary';
        case 'closed': return 'error';
        default: return 'default';
    }
}

export default function Question({
    answers,
    comments,
    creator,
    createdAt,
    downvotes,
    hasAcceptedAnswer,
    status,
    title,
    text,
    upvotes,
    views,
    vote
}) {
    return (
        <List>
            <Box m={2}>
                <Typography variant='h4'>{title}</Typography>
                <Typography display='inline' m={1}>Views: {views}</Typography>
                <Typography display='inline' m={1}>Answers: {answers} </Typography>
                <Typography display='inline' m={1}>Comments: {comments} </Typography>
                <Typography display='inline' m={1}> Status:</Typography>
                <Chip
                    color={statusColor(status)}
                    label={status}
                    size='small'
                />
                <Typography display='inline' m={1}>Accepted Answer:</Typography>
                <Chip
                    color={hasAcceptedAnswer ? 'success' : 'error'}
                    label={hasAcceptedAnswer ? 'yes' : 'no'}
                    size='small'
                />
            </Box>
            <Divider />
            <ListItem>
                <VoteControl {...{ downvotes, upvotes, vote }} />
                <ListItemText>
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CreationInfoTag {...{ createdAt, creator }} />
                </ListItemText>
            </ListItem>
            <CommentsList />
        </List>
    );
}
