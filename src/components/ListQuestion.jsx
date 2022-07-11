import { ListItem, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUser, hashEmail, getLevel } from '../services/userServices';
import { useState } from 'react';


export default function ListQuestion({ question, summaryLimit }) {

    const [level, setLevel] = useState()
    const [url, setUrl] = useState('')
    
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

    const days = parseInt((timeElapsed) / (1000 * 60 * 60 * 24));
    const hours = parseInt(Math.abs(timeElapsed) / (1000 * 60 * 60) % 24);
    const minutes = parseInt(Math.abs(timeElapsed) / (1000 * 60) % 60);

    const msg = days + " days, " + hours + " hours, and " + minutes + " minutes ago"

    const linkStyle = { textDecoration: 'none', color: 'inherit' };

    
    
    getUser(creator).then(function(res){
        res = res.user;
        setLevel(getLevel(res.points))
        setUrl(hashEmail(res.email))
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
                        {text.split(' ').slice(0, summaryLimit).join(' ') +
                            '...'}
                    </Typography>
                    
                    <Typography variant='body1' textAlign='right'>
                        <img src = {url} alt = "creator pfp" width = '40' height = '40'></img>
                        Asked by {creator} | level  {level} : {msg}
                    </Typography>
                </Grid>
            </Grid>
        </ListItem>
    );
}
