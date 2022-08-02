import {
    Box,
    Chip,
    Divider,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Tooltip,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import { CreationInfoTag } from 'controllers';
import { CommentControl, CreateAnswer, VoteControl } from 'controllers/QAControllers';
import { useUser } from 'contexts';
import {
    getQuestionVote,
    postQuestionComment,
    editQuestionStatus,
    updateQuestionVote,
} from 'services/questionsServices';

const statusColor = (status) => {
    switch (status) {
        case 'open':
            return 'primary';
        case 'protected':
            return 'secondary';
        case 'closed':
            return 'error';
        default:
            return 'default';
    }
};

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
    views,
}) {
    const { userData: { level, username } } = useUser();

    const protect = level >= 6 && status === 'open';
    const close = level >= 7;

    function changeProtect() {
        editQuestionStatus(question_id, 'protect');
    }

    function changeClose() {
        const operation = status === 'open' ? 'close' : 'reopen';
        editQuestionStatus(question_id, operation);
    }

    const getVote = () => getQuestionVote(question_id);
    const updateVote = (data) => updateQuestionVote(question_id, data);
    
    const postComment = (data) => postQuestionComment(question_id, data);
    
    return (
        <>
            <Box m={2}>
                <Typography variant='h4'>{title}</Typography>
                <Typography display='inline' m={1}>Views: {views}</Typography>
                <Typography display='inline' m={1}>Answers: {answers}</Typography>
                <Typography display='inline' m={1}>Comments: {comments}</Typography>
                <Typography display='inline' m={1}>Status:</Typography>
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
                <Button
                    component={Link}
                    display='inline'
                    m={1}
                    style={{ marginLeft: '10px' }}
                    to='../ask'
                    variant='contained'
                >
                    Ask question
                </Button>
                <Tooltip title={close ? '' : 'You must be level 7'}>
                    <span>
                        <Button
                            disabled={!close}
                            style={{ marginLeft: '10px' }}
                            display='inline'
                            m={1}
                            onClick={changeProtect}
                            variant='contained'
                        >
                            Close/Open
                        </Button>
                    </span>
                </Tooltip>
                <Tooltip title={protect ? '' : 'You must be  level 6 and this question must be open'}>
                    <span>
                        <Button
                            disabled={!protect}
                            style={{ marginLeft: '10px' }}
                            display='inline'
                            m={1}
                            variant='contained'
                            onClick={changeClose}
                        >
                            Protect
                        </Button>
                    </span>
                </Tooltip>
            </Box>
            <Divider />

            <ListItem disablePadding>
                <VoteControl
                    {...{
                        downvotes,
                        getVote,
                        orientation: 'vertical',
                        updateVote,
                        upvotes
                    }}
                />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <ReactMarkdown>{text}</ReactMarkdown>
                    <CommentControl {...{
                        canComment:
                            (level >= 3 && status === 'open')
                            || (level >= 5 && status === 'protected')
                            || creator === username,
                        postComment
                    }} />
                </ListItemText>
            </ListItem>
            <CreateAnswer />
        </>
    );
}
