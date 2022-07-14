import { ListItem, ListItemText, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
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
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CreationInfoTag {...{ createdAt, creator }} />
                </ListItemText>
        </ListItem>
    );
}
