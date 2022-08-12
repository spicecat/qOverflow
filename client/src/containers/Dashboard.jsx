import {
    Box,
    Button,
    Grid,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Gravatar from 'react-gravatar';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';

import { ListAnswer, ListQuestion, LoadingBar } from 'components';
import { useUser } from 'contexts';
import { PaginatedList } from 'controllers';
import { getUserAnswers, getUserQuestions } from 'services/userServices';

export default function Dashboard() {
    const navigate = useNavigate();

    const [current, setCurrent] = useState('questions');
    const [loading, setLoading] = useState(true);
    const {
        userData: { email, level, points, username },
    } = useUser();

    useEffect(() => {
        if (!Cookies.get('token')) {
            navigate('/users/login', {
                state: {
                    name: 'dashboard',
                    msg: 'You need to be authenticated to access this feature.',
                    prevPath: '/dashboard',
                },
            });
        }
    }, [navigate]);

    const onChange = (_, value) => {
        setCurrent(value);
    };

    const getAnswers = async () => {
        setLoading(() => true);
        const { error, answers } = await getUserAnswers();
        setLoading(() => false);
        if (!error) return answers;
    };

    const getQuestions = async () => {
        setLoading(() => true);
        const { error, questions } = await getUserQuestions();
        setLoading(() => false);
        if (!error) return questions;
    };

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <Paper
                sx={{
                    margin: { xs: '0.3vh', sm: '1vh', md: '1vh' },
                    padding: { xs: '1vh', sm: '3vh', md: '5vh' },
                    height: '100%',
                }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: { xs: 'flex', sm: 'block', md: 'block' },
                        justifyContent: 'center',
                    }}
                >
                    <Grid item sm={4} md={2}>
                        {email && (
                            <Gravatar email={email} size={200} style={{ borderRadius: '100%' }} />
                        )}
                    </Grid>
                    <Grid item sm={8} md={10}>
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
                        {loading && <LoadingBar />}
                    </Grid>

                    <Grid item md={12}>
                        {current === 'questions' && (
                            <PaginatedList
                                {...{
                                    Component: ListQuestion,
                                    getData: getQuestions,
                                }}
                            />
                        )}
                        {current === 'answers' && (
                            <PaginatedList
                                {...{
                                    Component: ListAnswer,
                                    getData: getAnswers,
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
