import { List, ListItem } from '@mui/material';
import Suggest from 'components/QAComponents/Suggest';
import { AnswersList, CommentsList, CreateAnswer, Question } from 'controllers/QAControllers';

export default function QA() {
    return (
        <List sx={{ pl: 2, pr: 2 }}>
            <Question />
            <ListItem sx={{ pl: 4 }}>
                <CommentsList />
            </ListItem>
            <CreateAnswer/>
            <Suggest/>
            <div id='answersList' />
            <AnswersList />
        </List>
    );
}
