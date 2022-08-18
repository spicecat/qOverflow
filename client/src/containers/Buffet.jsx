import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ListQuestion, LoadingBar } from 'components';
import { PaginatedList } from 'controllers';
import { searchQuestions } from 'services/questionsServices';

export default function Buffet() {
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(true);
    const [, setSearchParams] = useSearchParams();

    const getData = async ({ question_id }) => {
        const { questions } = await searchQuestions({
            sort,
        });

        setLoading(() => false);
        return questions;
    };

    const handleSortChange = (_, value) => {
        setSearchParams({ sort: value });
        setSort(value);
    };

    return (
        <Box height='100%'>
            <Box
                style={{
                    width: '100%',
                    border: '3px lightGray solid',
                    textAlign: 'center',
                    padding: '1vh',
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
            </Box>
            {loading && <LoadingBar />}
            <PaginatedList {...{ concat: true, Component: ListQuestion, getData }} />
        </Box>
    );
}
