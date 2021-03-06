import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Box,
    List,
    Pagination,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';

import { ListQuestion, PaginationEngine } from 'components';

import { searchQuestions } from 'services/questionsServices';
import { useError } from 'contexts';

export default function Buffet() {
    const recent = {};
    const best = { sort: 'u' };
    const interesting = {
        match: encodeURIComponent(JSON.stringify({ answers: 0 })),
        sort: 'uvc',
    };
    const hot = {
        match: encodeURIComponent(JSON.stringify({ hasAcceptedAnswer: false })),
        sort: 'uvac',
    };

    const sortObjArr = [recent, best, interesting, hot];

    const [sort, setSort] = useState(0);
    const [questionSet, setQuestionSet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const count = 3;

    const { setError } = useError();

    useEffect(() => {
        loadQuestions(sort);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            loadQuestions(sort);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    async function loadQuestions(newSort) {
        const {error, questions} = await searchQuestions({
            sort: sortObjArr[newSort].sort,
            match: sortObjArr[newSort].match,
        });
        
        if (error) {
            setError(error);
        } else
            setQuestionSet(questions);
    }

    const handleSortChange = (_, newSort) => {
        if (newSort !== sort) {
            setSort(newSort);

            loadQuestions(newSort);
        }
    };

    function handlePageChange(_, value) {
        setCurrentPage(() => value);
    }

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
            <List sx={{ pl: 2, pr: 2 }}>
                <PaginationEngine
                    component={ListQuestion}
                    count={count}
                    data={questionSet}
                    page={currentPage}
                />
            </List>
            <Box display='flex' justifyContent='center' sx={{ padding: '1vh' }}>
                <Pagination
                    count={Math.ceil(questionSet.length / count)}
                    onChange={handlePageChange}
                    page={currentPage}
                    style={{}}
                />
            </Box>
        </Box>
    );
}
