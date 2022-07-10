//This for Q and A
import { ListItem, ListItemText, Typography } from '@mui/material';
import { CommentsList, VoteControl } from '.';

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
    upvotes,
    views,
}) {
    return (
        <ListItem>
            <VoteControl {...{ downvotes, upvotes }} />
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    );
}
