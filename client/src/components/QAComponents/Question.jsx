import { Box, Chip, Divider, ListItem, ListItemText, Typography, Button, Tooltip } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag } from 'controllers';
import { CommentControl, VoteControl } from 'controllers/QAControllers';
import { getQuestionVote, postQuestionComment, updateQuestion, updateQuestionVote } from 'services/questionsServices';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from 'contexts';
import CreateAnswer from 'components/CreateAnswer';
const statusColor = (status) => {
    switch (status) {
        case 'open': return 'primary';
        case 'protected': return 'secondary';
        case 'closed': return 'error';
        default: return 'default';
    }
}

export default function Question({
    answers,
    comments,
    creator,
    createdAt,
    downvotes,
    hasAcceptedAnswer,
    status,
    title,
    text,
    question_id,
    upvotes,
    views
}) {

    const {userData} = useUser();
    let level = 0;
    let protection = false;

    let protect = false;
    let close = false;
    let canComment = false;
    let canAnswer = true;
    let canVote = true;
    
    if(userData.username){
        level = userData.level;
        if(status === 'protected' || status === 'closed'){protection = true;}

        if(level >= 7){close = true}
        if(level >= 6 && !protection){protect = true}
        if((level >= 3 && !protection) || (status === 'protected' && level >= 5)){canComment = true}
        if((status === 'protected' && level < 5) || status === 'closed'){canAnswer = false}
        if(status === 'closed' || level < 2){canVote = false}
    }else{
        canAnswer = false;
    }

    function changeProtect(){
        //updateQuestion(question_id, {"status" : "protected"})
    }
    function changeClose(){
        //updateQuestion(question_id, {"status" : (status === 'closed' ? "open" : 'closed')})
    }

    const getVote = () => getQuestionVote(question_id);
    const postComment = (data) => postQuestionComment(question_id, data);
    const updateVote = (data) => updateQuestionVote(question_id, data);
    

    return (
        <>
            <Box m={2}>
                <Typography variant='h4'>{title}</Typography>
                <Typography display='inline' m={1}>Views: {views}</Typography>
                <Typography display='inline' m={1}>Answers: {answers} </Typography>
                <Typography display='inline' m={1}>Comments: {comments} </Typography>
                <Typography display='inline' m={1}> Status:</Typography>
                
                <Chip
                    color={statusColor(status)}
                    label={status}
                    size='small'
                />
                <Typography display='inline' m={1}>Accepted Answer:</Typography>
                <Chip
                    color={hasAcceptedAnswer ? 'success' : 'error'}
                    label={hasAcceptedAnswer ? 'yes' : 'no'}
                    size='small'
                />
                <Button component={Link} to='../ask' style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained">Ask question</Button>

                <Tooltip title = {!close && "You must be level 7"}>
                    <span>
                    <Button disabled = {!close} style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained" onClick = {changeProtect}>Close/Open</Button>
                    </span>
                </Tooltip>

                <Tooltip title = {!protect && "You must be  level 6 and this question must be open" }>
                    <span>
                    <Button disabled = {!protect} style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained" onClick = {changeClose}>Protect</Button>
                    </span>
                </Tooltip>
            </Box>
            <Divider />
            
            <ListItem disablePadding>
                <VoteControl {...{ downvotes, getVote, orientation: 'vertical', updateVote, upvotes, canVote }} />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CommentControl {...{ postComment, canComment  }} />
                </ListItemText>
            </ListItem>
            <CreateAnswer {...{canAnswer, question_id}}/>
        </>
    );
}
