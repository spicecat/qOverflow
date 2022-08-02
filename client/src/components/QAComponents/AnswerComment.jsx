import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';
import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';
import { useQuestion } from 'contexts';
export default function AnswerComment({
    answer_id,
    comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    question_id,
    upvotes
}) {
    const getVote = () => getAnswerCommentVote(question_id, answer_id, comment_id);
    const updateVote = (data) => updateAnswerCommentVote(question_id, answer_id, comment_id, data);
    const {permissions} = useQuestion();
    let canVote = permissions.canVote;
    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                </ListItemText>
                <VoteControl {...{ downvotes, getVote, updateVote, upvotes, canVote }} />
            </ListItem >
            <Divider />
        </span >
    );
}