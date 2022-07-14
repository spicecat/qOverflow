import { Divider, ListItem, ListItemText } from '@mui/material';
import { CommentsList } from '.';
import { VoteControl } from '../controllers';

export default function Answer({
    accepted,
    answer_id,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes
}) {
    return (
        <span key={answer_id}>
            <ListItem>
                <VoteControl {...{ downvotes, upvotes }} />
                <ListItemText>
                    {text}
                </ListItemText>
            </ListItem>
            <Divider />
        </span>
    )
}