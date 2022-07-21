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
        questionID,
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
                                {accepted && `Accepted Answer`}
                            </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        <CreationInfoTag
                            {...{ createdAt, creator }}
                            text='answered'
                        />
                        <Typography
                            noWrap
                            variant='body1'
                            component={Link}
                            to={`/questions/${questionID}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            {text.split(' ').slice(0, 150).join(' ') + '...'}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
