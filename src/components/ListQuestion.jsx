import { ListItem, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListQuestion({ question, summaryLimit }) {
    const {
        question_id,
        title,
        text,
        upvotes,
        downvotes,
        answers,
        views,
        status,
        creator,
    } = question;
    const createdAt = new Date(question.createdAt).toString();

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    return (
        <ListItem>
            <Grid container>
                <Grid item xs={2}>
                    <Stack justifyContent='center' sx={{ height: '100%' }}>
                        <Typography variant='body1'>
                            {upvotes - downvotes} votes
                        </Typography>
                        <Typography variant='body1'>
                            {answers} answers
                        </Typography>
                        <Typography variant='body1'>{views} views</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={10}>
                    <Typography
                        variant='h6'
                        component={Link}
                        to={`questions/${question_id}`}
                        style={linkStyle}
                    >
                        [{status}] {title}
                    </Typography>
                    <Typography variant='body1'>
                        {text.split(' ').slice(0, summaryLimit).join(' ') +
                            '...'}
                    </Typography>
                    <Typography variant='body1' textAlign='right'>
                        Asked by {creator} at {createdAt}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    );
}
