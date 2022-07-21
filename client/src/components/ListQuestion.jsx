import { Divider, Grid, ListItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreationInfoTag } from 'controllers';

export default function ListQuestion({
    question: {
        answers,
        createdAt,
        creator,
        downvotes,
        _id,
        status,
        text,
        title,
        upvotes,
        views,
    }
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
                            <Typography variant='body1'>{answers} answers</Typography>
                            <Typography variant='body1'>{views} views</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        <CreationInfoTag {...{ createdAt, creator }} />
                        <Typography
                            variant='h6'
                            component={Link}
                            to={`questions/${_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            [{status}] {title}
                        </Typography>
                        <Typography noWrap variant='body1'>{text}</Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
