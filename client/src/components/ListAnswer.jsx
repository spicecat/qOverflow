import { Divider, Grid, ListItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreationInfoTag } from 'controllers';

export default function ListAnswer({
    data: {
        createdAt,
        creator,
        downvotes,
        accepted,
        text,
        upvotes,
        views,
        question: { questionID, title },
    },
}) {
    return (
        <span>
            <ListItem disablePadding>
                <Grid container>
                    <Grid item xs={2}>
                        <Stack justifyContent='center' sx={{ height: '100%' }}>
                            <Typography variant='body1'>
                                {upvotes - downvotes} votes
                            </Typography>
                            <Typography variant='body1'>
                                {views} views
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        <CreationInfoTag {...{ createdAt, creator }} />
                        <Typography
                            variant='h6'
                            component={Link}
                            to={`questions/${questionID}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {accepted && ['Accepted']}
                        </Typography>
                        <Typography noWrap variant='body1'>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
