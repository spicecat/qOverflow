import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag, VoteControl } from '../controllers';

export default function Comment({
    comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes
}) {
    return (
        <span key={comment_id}>
            <ListItem>
                <VoteControl {...{ downvotes, upvotes }} />
                <ListItemText>
                    {text}
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                </ListItemText>
            </ListItem>
            <Divider />
        </span>
    );
}