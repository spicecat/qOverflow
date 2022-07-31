import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import { useError } from 'contexts';
import { PaginatedList } from 'controllers';
import { ListQuestion } from 'components';
import { searchQuestions } from 'services/questionsServices';

const recent = {};
const best = { sort: 'u' };
const interesting = { match: JSON.stringify({ 'answers': 0 }), sort: 'uvc' };
const hot = { match: JSON.stringify({ hasAcceptedAnswer: false }), sort: 'uvac' };
const sortObjArr = [recent, best, interesting, hot];

export default function Buffet() {
    const { setError } = useError();

    const [sort, setSort] = useState(0);

    const getData = async ({ question_id }) => {

        const { error, questions } = await searchQuestions({
            ...sortObjArr[sort],
            after: question_id
        });
        if (error) {
            setError(error);
        } else
            return questions;
    }

    const handleSortChange = (_, newSort) => {
        if (newSort !== sort)
            setSort(newSort);
    };

    return (
        <Box>
            <Box
                style={{
                    width: '100%',
                    height: '60%',
                    border: '3px lightGray solid',
                    textAlign: 'center',
                }}
            >
                <Typography variant='h3'>Top Questions</Typography>

                <Button
                    variant='contained'
                    style={{ marginTop: '1%' }}
                    component={Link}
                    to='questions/ask'
                >
                    Ask A Question
                </Button>

                <ToggleButtonGroup
                    color='primary'
                    value={sort}
                    exclusive
                    onChange={handleSortChange}
                    style={{ display: 'block', marginTop: '1%' }}
                >
                    <ToggleButton value={0}>Recent</ToggleButton>
                    <ToggleButton value={1}>Best</ToggleButton>
                    <ToggleButton value={2}>Interesting</ToggleButton>
                    <ToggleButton value={3}>Hot</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <PaginatedList {...{ Component: ListQuestion, getData }} />;
        </Box>
    );
}
