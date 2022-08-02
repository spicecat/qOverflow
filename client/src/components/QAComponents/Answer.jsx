import { Button, ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';

import { useUser } from 'contexts';
import { AnswerCommentsList, CommentControl, VoteControl } from 'controllers/QAControllers';
import { getAnswerVote, updateAcceptAnswer, updateAnswerVote, updateQuestion } from 'services/questionsServices';
import { useQuestion } from 'contexts';
import { postQuestionComment } from 'services/questionsServices';
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
    const { userData: { level, username } } = useUser();

    const getVote = () => getAnswerVote(question_id, answer_id);
    const updateVote = (data) => updateAnswerVote(question_id, answer_id, data);
    
    const {permissions} = useQuestion();
    let canVote = permissions.canVote;
    let canComment = permissions.canComment;
    let canAccept = permissions.canAccept;

    function acceptAnswer(){
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
                    <CommentControl {...{canComment, postComment}} />
                    <Tooltip title = {!canAccept && "Only the creator can accept, or an answer is already accepted"}><span><Button  onClick = {acceptAnswer} disabled = {!canAccept} style = {{'marginLeft':'10px'}}variant = "standard">Accept</Button></span></Tooltip>
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerCommentsList {...{ answer_id, comments }} />
            </ListItem>
        </span>
    );
}
