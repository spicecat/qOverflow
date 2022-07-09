//This for Q and A
import { ListItem, ListItemText, Tooltip, Typography } from "@mui/material";
import { CommentsList, VoteControl } from '.'

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
    views
}) {

    return (
        <ListItem>
            <VoteControl />
            <ListItemText>
                {text}
            </ListItemText>
            <CommentsList />
        </ListItem >
    )
}