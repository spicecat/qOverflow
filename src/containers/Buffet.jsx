import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ListQuestion } from '../components';

import { searchQuestions } from '../services/questionsServices';

export default function Buffet() {
    const [sort, setSort] = useState('');
    const [questionSet, setQuestionSet] = useState([]);

    useEffect(() => {
        loadQuestions();
    }, []);

    function loadQuestions() {
        if (sort) {
            console.log({sort})
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
            {questionSet.map((question) => (
                <ListQuestion
                    question={question}
                    summaryLimit={50}
                    key={question.question_id}
                ></ListQuestion>
            ))}
        </div>
    );
}
