import {
    Paper,
    Avatar,
    Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Box,
    Pagination,
    Button,
} from '@mui/material';
import { useUser } from 'contexts';
import { getGravatarURL } from 'services/getGravatarURL';
import { getUserQuestions, getUserAnswers } from 'services/userServices';
import { ListAnswer, ListQuestion, PaginationEngine } from 'components';
import { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
    switch (action.type) {
        case 'current':
            return { ...state, current: action.value, page: 1 };
        case 'questions':
            return { ...state, questions: action.value };
        case 'answers':
            return { ...state, answers: action.value };
        case 'page':
            return { ...state, page: action.value };
        default:
            return state;
    }
};

export default function Dashboard() {
    const [dataset, setDataset] = useReducer(reducer, {
        count: 3,
        page: 1,
        current: 'questions',
        answers: [],
        questions: [],
    });

    const { userData } = useUser();

    const onChange = (_, value) => {
        setDataset({ type: 'current', value });
    };

    const onPageChange = (_, value) => {
        setDataset({ type: 'page', value });
    };

    const fetchAnswers = async () => {
        const request = await getUserAnswers();
        if (!request.error) {
            setDataset({ type: 'answers', value: request.answers });
        }
    };

    const fetchQuestions = async () => {
        const request = await getUserQuestions();
        if (!request.error) {
            setDataset({ type: 'questions', value: request.questions });
        }
    };

    useEffect(() => {
        fetchAnswers();
        fetchQuestions();
    }, []);

    return (
        <Paper sx={{ margin: '1vh', padding: '5vh' }}>
            <Grid container spacing={2}>
                <Grid item md={2}>
                    <Avatar
                        sx={{ width: 200, height: 200 }}
                        src={getGravatarURL(userData.email)}
                    />
                </Grid>
                <Grid item md={10}>
                    <Typography>Username: {userData.username}</Typography>
                    <Typography>Email: {userData.email}</Typography>
                    <Typography>Level: {userData.level}</Typography>
                    <Typography>Points: {userData.points}</Typography>
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
                            value={dataset.current}
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
                    {dataset.current === 'questions' && (
                        <PaginationEngine
                            component={ListQuestion}
                            data={dataset.questions}
                            page={dataset.page}
                            count={dataset.count}
                        />
                    )}
                    {dataset.current === 'answers' && (
                        <PaginationEngine
                            component={ListAnswer}
                            data={dataset.answers}
                            page={dataset.page}
                            count={dataset.count}
                        />
                    )}
                    <Box
                        display='flex'
                        justifyContent='center'
                        sx={{ padding: '1vh' }}
                    >
                        <Pagination
                            count={Math.ceil(
                                dataset[dataset.current].length / dataset.count
                            )}
                            onChange={onPageChange}
                            page={dataset.page}
                            style={{}}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
