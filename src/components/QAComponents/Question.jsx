import { Box, Chip, Divider, ListItem, ListItemText, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag, VoteControl } from 'controllers';
import { getQuestionVote, updateQuestionVote } from 'services/questionsServices';

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
    question_id,
    status,
    title,
    text,
    upvotes,
    views
}) {
    const getVote = (username) => getQuestionVote(question_id, username);
    const updateVote = (username, data) => updateQuestionVote(question_id, username, data);

    return (
        <>
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
            <ListItem disablePadding>
                <VoteControl {...{ downvotes, getVote, orientation: 'vertical', updateVote, upvotes }} />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                </ListItemText>
            </ListItem>
        </>
    );
}
