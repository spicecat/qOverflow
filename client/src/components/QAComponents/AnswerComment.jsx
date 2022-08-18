import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, IconButton, ListItem, ListItemText } from '@mui/material';

import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';

export default function AnswerComment({
    comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes,
    getVote,
    onDelete,
    updateVote,
}) {
    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                </ListItemText>
                <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
                {onDelete && <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>}
            </ListItem>
            <Divider />
        </span>
    );
}
