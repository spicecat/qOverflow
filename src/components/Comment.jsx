import { ListItem, ListItemText, Typography } from '@mui/material';
import { VoteControl } from '.';

export default function Comment({
    creator,
    createdAt,
    downvotes,
    text,
    upvotes
}) {
    return (
        <ListItem>
            <VoteControl {...{ downvotes, upvotes }} />
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    )
}