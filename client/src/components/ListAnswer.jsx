import { Divider, Grid, ListItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { CreationInfoTag } from 'controllers';

export default function ListAnswer({
    answer_id,
    createdAt,
    creator,
    downvotes,
    accepted,
    text,
    upvotes,
    question_id,
}) {
    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <Grid container>
                    <Grid item xs={2}>
                        <Stack justifyContent='center' sx={{ height: '100%' }}>
                            <Typography variant='body1'>{upvotes - downvotes} votes</Typography>
                            <Typography variant='body1'>{accepted && `Accepted Answer`}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        <CreationInfoTag {...{ createdAt, creator }} text='answered' />
                        <Typography
                            variant='body1'
                            component={Link}
                            to={`/questions/${question_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {text
                                .replace(/<[^>]*>?/gm, '')
                                .split(' ')
                                .slice(0, 30)
                                .join(' ') + '...'}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
