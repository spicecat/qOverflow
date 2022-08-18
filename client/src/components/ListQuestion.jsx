import { Divider, Grid, ListItem, Stack, Typography, Chip } from '@mui/material';
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
                    {(sm || md) && (
                        <Grid item xs={2}>
                            <Stack justifyContent='center' sx={{ height: '100%' }}>
                                <ListQuestionInfo
                                    {...{
                                        answers,
                                        downvotes,
                                        inline: false,
                                        hasAcceptedAnswer,
                                        tags,
                                        upvotes,
                                        views,
                                    }}
                                />
                            </Stack>
                        </Grid>
                    )}

                    <Grid item xs={10}>
                        {sm || md ? null : (
                            <ListQuestionInfo
                                {...{
                                    answers,
                                    downvotes,
                                    inline: true,
                                    hasAcceptedAnswer,
                                    tags,
                                    upvotes,
                                    views,
                                }}
                            />
                        )}
                        <CreationInfoTag {...{ createdAt, creator }} />
                        <Typography
                            variant='h6'
                            component={Link}
                            to={`/questions/${question_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            [{status}] {title}{' '}
                            <Chip
                                color={hasAcceptedAnswer ? 'success' : 'error'}
                                label={hasAcceptedAnswer ? 'Accepted' : 'Unaccepted'}
                                size='small'
                            />
                        </Typography>
                        <Typography noWrap variant='body1'>
                            {text.replace(/<[^>]*>?/gm, '')}
                        </Typography>
                        {tags.length > 0 && (
                            <Typography display='inline'>
                                Tags:{' '}
                                {tags.map((tag, index) => (
                                    <Chip
                                        label={tag}
                                        size='small'
                                        key={index}
                                        sx={{ margin: '0 0.1vw' }}
                                    />
                                ))}
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </ListItem>
            <Divider />
        </span>
    );
}
