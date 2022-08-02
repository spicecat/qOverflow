import { Button, ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import CreationInfoTag from 'components/CreationInfoTag';
import { useQuestion } from 'contexts';
import { AnswerCommentsList, CommentControl, VoteControl } from 'controllers/QAControllers';
import { getAnswerVote, postAnswerComment, updateAcceptAnswer, updateAnswerVote } from 'services/questionsServices';

export default function Answer({
    accepted,
    answer_id,
    comments,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes,
}) {
    const { permissions } = useQuestion();
    let canVote = permissions.canVote;
    let canComment = permissions.canComment;
    let canAccept = permissions.canAccept;
    
    const getVote = () => getAnswerVote(question_id, answer_id);
    const updateVote = (data) => updateAnswerVote(question_id, answer_id, data);

    function acceptAnswer() {
        updateAcceptAnswer(question_id, answer_id)

    }
    const postComment = (data) => postAnswerComment(question_id, answer_id, data);

    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <ButtonGroup orientation='vertical'>
                    <VoteControl {...{ downvotes, getVote, orientation: 'vertical', updateVote, upvotes, canVote }} />
                    {accepted && (
                        <div style={{ textAlign: 'center' }}>
                            <Tooltip title='Accepted Answer' placement='right'>
                                <CheckIcon color='success' />
                            </Tooltip>
                        </div>
                    )}
                </ButtonGroup>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'answered' }} />
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CommentControl {...{ canComment, postComment }} />
                    {canAccept && (
                        <span>
                            <Button onClick={acceptAnswer} style={{ 'marginLeft': '10px' }} variant="standard">
                                Accept
                            </Button>
                        </span>
                    )}
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerCommentsList {...{ answer_id, comments }} />
            </ListItem>
        </span>
    );
}
