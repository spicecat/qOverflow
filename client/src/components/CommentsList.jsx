//This for Q and A
import { List } from '@mui/material';
import { Comment } from '.'

export default function CommentsList({
    comments
}) {

    return (
        <List>
            {comments.map(comment => (
                <Comment {...comment} />
            ))}
        </List>
    )
}