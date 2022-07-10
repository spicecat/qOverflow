import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { BuffetViewQuestion, PaginatedList } from '../components';

export default function Questions() {
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
            /*

            console.log('rendered')

            const response = await fetch('https://qoverflow.api.hscc.bdpa.org/v1/questions/search',{
                method: 'GET',
                authorization: process.env.KEY,

                headers: {
                    'Content-Type' : 'application/json'
                }


                
            })

            const data = await response.json();

            console.log(data)

            */
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

                <Button variant='contained' style={{ marginTop: '1%' }}>
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
