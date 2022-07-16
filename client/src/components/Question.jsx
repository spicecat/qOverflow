//This for Q and A
import { ListItem, ListItemText, Typography } from '@mui/material';
import { CommentsList } from '.';
import { QuestionVoteControl } from '../controllers';

export default function Question({
    answers,
    comments,
    creator,
    createdAt,
    hasAcceptedAnswer,
    status,
    title,
    text,
    views,
}) {
    return (
        <ListItem>
            <QuestionVoteControl />
            <ListItemText>
                {text}
            </ListItemText>
        </ListItem>
    );
}
