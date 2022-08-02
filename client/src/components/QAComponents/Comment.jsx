import { Divider, ListItem, ListItemText } from '@mui/material';
import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';
import { getCommentVote, updateCommentVote } from 'services/questionsServices';
import { useQuestion } from 'contexts';

export default function Comment({
    comment_id,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes,
    
}) {
    const getVote = () => getCommentVote(question_id, comment_id);
    const updateVote = (data) => updateCommentVote(question_id, comment_id, data);
    const {permissions} = useQuestion();
    let canVote = permissions.canVote;
    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                </ListItemText>
                <VoteControl {...{ downvotes, getVote, updateVote, upvotes, canVote}} />
            </ListItem>
            <Divider />
        </span>
    );
}