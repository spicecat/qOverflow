import { ListItem, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUser, getLevel } from '../services/userServices';
import { useState } from 'react';
import Gravatar from 'react-gravatar';
import removeMd from 'remove-markdown';

export default function ListQuestion({ question, summaryLimit }) {
    const [level, setLevel] = useState();
    const [email, setEmail] = useState('');

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

    const timeElapsed = Date.now() - question.createdAt;

    const days = parseInt(timeElapsed / (1000 * 60 * 60 * 24));
    const hours = parseInt((Math.abs(timeElapsed) / (1000 * 60 * 60)) % 24);
    const minutes = parseInt((Math.abs(timeElapsed) / (1000 * 60)) % 60);

    const msg =
        days + ' days, ' + hours + ' hours, and ' + minutes + ' minutes ago';

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    getUser(creator).then(({ user }) => {
        setLevel(getLevel(user.points));
        setEmail(user.email);
    });

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
                        {removeMd(
                            text.split(' ').slice(0, summaryLimit).join(' ')
                        ) + '...'}
                    </Typography>

                    <Typography variant='body1' textAlign='right'>
                        Asked by{' '}
                        <Gravatar
                            size={15}
                            email={email}
                            style={{ borderRadius: '15%' }}
                        />
                        {creator} <b>{level}</b> : {msg}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    );
}
