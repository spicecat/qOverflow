import { List, ListItem } from '@mui/material';
import { AnswersList, CommentsList, Question } from 'controllers/QAControllers';

export default function QA() {

    return (
        <List sx={{ pl: 2, pr: 2 }}>
            <Question />
            <ListItem sx={{ pl: 8 }}>
                <CommentsList />
            </ListItem>
            <AnswersList />
        </List>
    );
}
