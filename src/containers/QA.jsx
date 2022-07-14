import { List } from '@mui/material';
import { Question } from '../controllers'

export default function QA() {
    //This for Q and A

    return (
        <List sx={{ pl: 2, pr: 2 }}>
            <Question />
        </List>
    );
}
