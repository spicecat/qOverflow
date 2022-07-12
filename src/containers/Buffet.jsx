import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Typography,
    Button,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Pagination,
} from '@mui/material';

import { ListQuestion, PaginationEngine } from '../components';

import { searchQuestions } from '../services/questionsServices';

export default function Buffet() {
    const [sort, setSort] = useState('');
    const [questionSet, setQuestionSet] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const count = 3;

    useEffect(() => {
        loadQuestions();
    }, []);

    function loadQuestions() {
        if (sort) {
            console.log({ sort });
            searchQuestions({ sort }).then((res) => {
                setQuestionSet(() => res.questions);
            });
        } else {
            searchQuestions().then((res) => {
                setQuestionSet(() => res.questions);
            });
        }
    }

    const handleSortChange = (e) => {
        setSort(() => e.target.value);
        loadQuestions();
    };

    function handlePagChange(_, value) {
        setCurrentPage(() => value);
    }

    function getComponents() {
        return questionSet.map((question) => (
            <ListQuestion
                question={question}
                summaryLimit={50}
                key={question.question_id}
            />
        ));
    }

    return (
        <div>
            <div
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
                    <ToggleButton value=''>Recent</ToggleButton>
                    <ToggleButton value='u'>Best</ToggleButton>
                    <ToggleButton value='uvc'>Interesting</ToggleButton>
                    <ToggleButton value='uvac'>Hot</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <PaginationEngine
                components={getComponents()}
                page={currentPage}
                count={count}
            />
            <Box display='flex' justifyContent='center' sx={{ padding: '1vh' }}>
                <Pagination
                    count={Math.ceil(questionSet.length / count)}
                    onChange={handlePagChange}
                    page={currentPage}
                    style={{}}
                />
            </Box>
        </div>
    );
}
