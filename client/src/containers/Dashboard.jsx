import {
    Paper,
    Avatar,
    Grid,
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Box,
} from '@mui/material';
import { useUser } from 'contexts';
import { getGravatarURL } from 'services/getGravatarURL';
import { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case 'current':
            return { ...state, current: action.value };
        case 'questions':
            return { ...state, questions: action.value };
        case 'answers':
            return { ...state, answers: action.value };
        default:
            return state;
    }
};

export default function Dashboard() {
    const [dataset, setDataset] = useReducer(reducer, {
        current: 'answers',
        answers: [],
        questions: [],
    });

    const userData = {
        username: 'pinapplezzz',
        email: 'apiteam@swagger.io',
        points: 0,
        level: 0,
    };

    const onChange = (e) => {
        setDataset({ type: 'current', value: e.target.value });
    };

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
                        <ToggleButtonGroup
                            value={dataset.current}
                            exclusive
                            onChange={onChange}
                            fullWidth
                        >
                            <ToggleButton value='questions'>
                                Questions
                            </ToggleButton>
                            <ToggleButton value='answers'>Answers</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
