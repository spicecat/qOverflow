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

import { ListQuestion, PaginationEngine } from '../components';

import { searchQuestions } from '../services/questionsServices';

export default function Buffet() {

    const recent = { qmatch: "?", sortType: "" }
    const best = { qmatch: "?", sortType: "&sort=u" }
    const interesting = { qmatch: "?match=" + encodeURIComponent(JSON.stringify({ 'answers': 0 })), sortType: '&sort=uvc' }
    const hot = { qmatch: "?match=" + encodeURIComponent(JSON.stringify({ 'hasAcceptedAnswer': false })), sortType: '&sort=uvac' }

    const sortObjArr = [recent, best, interesting, hot]

    const [sort, setSort] = useState(0);

    const [questionSet, setQuestionSet] = useState([]);



    const [currentPage, setCurrentPage] = useState(1);
    const count = 3;

    useEffect(() => {
        loadQuestions(0);

    }, []);

    function loadQuestions(newSort) {


        if (newSort >= 0) {


            searchQuestions(sortObjArr[newSort].qmatch, sortObjArr[newSort].sortType).then((res) => {
                setQuestionSet(res.questions ?? []);
                //hasAcceptedAnswer
            });
        }


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

    function getComponents() {
        return questionSet.map((question) => (
            <ListQuestion
                question={question}
                key={question.question_id}
            />
        ));
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
                    <ToggleButton value={0} >Recent</ToggleButton>
                    <ToggleButton value={1}>Best</ToggleButton>
                    <ToggleButton value={2} >Interesting</ToggleButton>
                    <ToggleButton value={3}>Hot</ToggleButton>

                </ToggleButtonGroup>
            </Box>
            <List sx={{ pl: 2, pr: 2 }}>
                <PaginationEngine
                    components={getComponents()}
                    page={currentPage}
                    count={count}
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
