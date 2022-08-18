import { Divider, Grid, ListItem, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { CreationInfoTag } from 'controllers';
import ListQuestionInfo from './ListQuestionInfo';
import { useMediaQuery } from '@mui/material';
export default function ListQuestion({
    question_id,
    answers,
    createdAt,
    creator,
    downvotes,
    status,
    tags,
    text,
    title,
    upvotes,
    views,
    hasAcceptedAnswer,
}) {
    const sm = useMediaQuery((theme) => theme.breakpoints.only('sm'));
    const md = useMediaQuery((theme) => theme.breakpoints.only('md'));

    return (
        <span key={question_id}>
            <ListItem disablePadding>
                <Grid container>
                    <Grid item xs={2}>
                        <Stack justifyContent='center' sx={{ height: '100%' }}>
                            {sm || md ? <ListQuestionInfo {...{ answers, downvotes, inline: false, hasAcceptedAnswer, tags, upvotes, views }} /> : null}
                        </Stack>
                    </Grid>
                    <Grid item xs={10}>
                        {sm || md ? null : <ListQuestionInfo {...{ answers, downvotes, inline: true, hasAcceptedAnswer, tags, upvotes, views }} />}
                        <CreationInfoTag {...{ createdAt, creator }} />
                        <Typography
                            variant='h6'
                            component={Link}
                            to={`/questions/${question_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            [{status}] {title}
                        </Typography>
                        <Typography noWrap variant='body1'>
                            {text.replace(/<[^>]*>?/gm, '')}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
