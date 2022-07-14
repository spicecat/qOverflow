import { Divider, ListItem, ListItemText } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag, VoteControl } from '../controllers';

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
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CreationInfoTag {...{ createdAt, creator, text: 'answered' }} />
                </ListItemText>
            </ListItem>
            <Divider />
        </span>
    )
}