import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';
import { getCommentVote, updateCommentVote } from 'services/questionsServices';

export default function Comment({
    _id,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes
}) {
    const getVote = (username) => getCommentVote(question_id, _id, username);
    const updateVote = (username, data) => updateCommentVote(question_id, _id, username, data);

    return (
        <span key={_id}>
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