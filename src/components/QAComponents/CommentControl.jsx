import AddCommentOutlinedIcon from '@mui/icons-material/AddCommentOutlined';
import { VoteControl } from 'controllers';

export default function CommentControl({
    downvotes,
    getVote,
    updateVote,
    upvotes
}) {

    return (
        <div>
            <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
            <AddCommentOutlinedIcon />
        </div>
    )
}