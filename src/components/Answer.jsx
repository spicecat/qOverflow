import { Divider, ListItem, ListItemText } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { AnswerCommentsList, CreationInfoTag, VoteControl } from '../controllers';

export default function Answer({
    accepted,
    answer_id,
    comments,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes
}) {
    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <VoteControl {...{ downvotes, upvotes }} />
                <ListItemText>
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CreationInfoTag {...{ createdAt, creator, text: 'answered' }} />
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
            <AnswerCommentsList {...{ answer_id, comments }} />
            </ListItem>
        </span>
    )
}