//This for Q and A
import { ListItem, ListItemText, Typography } from '@mui/material';
import { CommentsList } from '.';
import { VoteControl } from '../controllers';

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
    vote
}) {
    return (
        <ListItem>
            <VoteControl {...{ downvotes, upvotes, vote }} />
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    );
}
