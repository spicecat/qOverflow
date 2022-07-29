import { Box, Chip, Divider, ListItem, ListItemText, Typography, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag } from 'controllers';
import { CommentControl, VoteControl } from 'controllers/QAControllers';
import { getQuestionVote, postQuestionComment, updateQuestionVote } from 'services/questionsServices';
import { Link } from 'react-router-dom';
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
    question_id,
    upvotes,
    views
}) {
    const getVote = () => getQuestionVote(question_id);
    const postComment = (data) => postQuestionComment(question_id, data);
    const updateVote = (data) => updateQuestionVote(question_id, data);

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
                <Button component={Link} to='../ask' style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained">Ask question</Button>
            </Box>
            <Divider />
            <ListItem disablePadding>
                <VoteControl {...{ downvotes, getVote, orientation: 'vertical', updateVote, upvotes }} />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CommentControl {...{ postComment }} />
                </ListItemText>
            </ListItem>
        </>
    );
}
