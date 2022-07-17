import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag, VoteControl } from 'controllers';
import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';

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
    const getVote = (username) => getAnswerCommentVote(question_id, answer_id, comment_id, username);
    const updateVote = (username, data) => updateAnswerCommentVote(question_id, answer_id, comment_id, username, data);

    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                    <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
                </ListItemText>
            </ListItem>
            <Divider />
        </span>
    );
}