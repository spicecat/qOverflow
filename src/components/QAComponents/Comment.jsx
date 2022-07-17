import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag, VoteControl } from 'controllers';
import { getCommentVote, updateCommentVote } from 'services/questionsServices';
import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';

export default function Comment({
    comment_id,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes
}) {
    const getVote = (username) => getCommentVote(question_id, comment_id, username);
    const updateVote = (username, data) => updateCommentVote(question_id, comment_id, username, data);

    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                    <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
                    <AddCommentOutlinedIcon />
                </ListItemText>
            </ListItem>
            <Divider />
        </span>
    );
}