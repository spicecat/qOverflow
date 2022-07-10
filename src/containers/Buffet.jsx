import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { BuffetViewQuestion } from '../components';

import { searchQuestions } from '../services/questionsServices';

export default function Buffet() {
    useEffect(() => {
        loadQuestions();
    });

    // api: https://qoverflow.api.hscc.bdpa.org/V

    //key:

    // '/questions/search' will return 100 questions

    //let myURL = 'https://qoverflow.api.hscc.bdpa.org/v1/questions/search'

    const [sort, setSort] = useState('Recent');

    function loadQuestions() {
        if (sort === 'Recent') {
            searchQuestions().then((data) => {
                return data;
            });
        }
    }

    const handleSortChange = (event, newSort) => {
        if (newSort !== null) {
            setSort(newSort);
            loadQuestions();
        }
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
                <Typography variant='h3' style={{}}>
                    Top Questions
                </Typography>

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
                    <ToggleButton value='Recent'>Recent</ToggleButton>
                    <ToggleButton value='Best'>Best</ToggleButton>
                    <ToggleButton value='Interesting'>Interesting</ToggleButton>
                    <ToggleButton value='Hot'>Hot</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <BuffetViewQuestion
                questionTitle={'Sample Title'}
            ></BuffetViewQuestion>
        </div>
    );
}
