//This for Q and A
import { List, ListItem } from "@mui/material";
import { Comment } from '.'

export default function CommentsList({
    comments
}) {

    return (
        <List>
            <Comment />
        </List>
    )
}