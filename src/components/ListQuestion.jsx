import { ListItem, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreationInfoTag } from '../controllers';

export default function ListQuestion({
    question: {
        answers,
        createdAt,
        creator,
        downvotes,
        question_id,
        status,
        text,
        title,
        upvotes,
        views,
    },
    summaryLimit
}) {

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
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        [{status}] {title}
                    </Typography>
                    <Typography variant='body1'>
                        {text.split(' ').slice(0, summaryLimit).join(' ') +
                            '...'}
                    </Typography>
                    
                    <CreationInfoTag {...{ createdAt, creator }} />
                </Grid>
            </Grid>
        </ListItem>
    );
}
