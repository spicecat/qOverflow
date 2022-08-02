import {
    Box,
    Button,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Gravatar from 'react-gravatar';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import { useUser } from 'contexts';
import { PaginatedList } from 'controllers';
import { ListAnswer, ListQuestion } from 'components';
import { getUserQuestions, getUserAnswers } from 'services/userServices';

export default function Dashboard() {
    const navigate = useNavigate();

    const [current, setCurrent] = useState('questions');
    const { userData: {
        email,
        level,
        loading,
        points,
        username,
    } } = useUser();

    const onChange = (_, value) => {
        setCurrent(value);
    };

    const getAnswers = async ({ answer_id }) => {
        const { error, answers } = await getUserAnswers({ after: answer_id });
        if (!error)
            return answers;
    };

    const getQuestions = async ({ question_id }) => {
        const { error, questions } = await getUserQuestions({ after: question_id });
        if (!error)
            return questions;
    };

    useEffect(() => {
        if (loading === false) {
            navigate('/users/login', {
                state: {
                    name: 'dashboard',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/dashboard',
                },
            });
        }
    }, [loading, navigate]);

    return username && (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Paper sx={{ margin: '1vh', padding: '5vh' }}>
                <Grid container spacing={2}>
                    <Grid item md={2}>
                        {email && <Gravatar email={email} size={200} style={{ borderRadius: '100%' }} />}
                    </Grid>
                    <Grid item md={10}>
                        <Typography>Username: {username}</Typography>
                        <Typography>Email: {email}</Typography>
                        <Typography>Level: {level}</Typography>
                        <Typography>Points: {points}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Button
                                color='primary'
                                component={Link}
                                to='/dashboard/update'
                                sx={{ margin: '0 1vh' }}
                                variant='outlined'
                                fullWidth
                            >
                                Update User Information
                            </Button>
                            <ToggleButtonGroup
                                value={current}
                                exclusive
                                onChange={onChange}
                                fullWidth
                            >
                                <ToggleButton value='questions' variant='outlined'>
                                    Questions
                                </ToggleButton>
                                <ToggleButton value='answers' variant='outlined'>
                                    Answers
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>
                    </Grid>

                    <Grid item md={12}>
                        {current === 'questions' && <PaginatedList {...{ Component: ListQuestion, getData: getQuestions }} />}
                        {current === 'answers' && <PaginatedList {...{ Component: ListAnswer, getData: getAnswers }} />}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
