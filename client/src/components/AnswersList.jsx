//This for Q and A
import { List } from '@mui/material';
import { Answer } from '.'

export default function AnswersList({
    answers
}) {

    return (
        <List>
            {answers.map(answer => (
                <Answer {...answer} />
            ))}
        </List>
    )
}