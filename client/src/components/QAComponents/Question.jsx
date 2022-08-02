import {
    Box,
    Chip,
    Divider,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Tooltip,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag } from 'controllers';
import { CommentControl, VoteControl } from 'controllers/QAControllers';
import { getQuestionVote, postQuestionComment,openQuestion,protectQuestion , updateQuestion, closeQuestion, updateQuestionVote } from 'services/questionsServices';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuestion, useUser } from 'contexts';
import CreateAnswer from './CreateAnswer';
const statusColor = (status) => {
    switch (status) {
        case 'open':
            return 'primary';
        case 'protected':
            return 'secondary';
        case 'closed':
            return 'error';
        default:
            return 'default';
    }
};

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
    views,
    protect,
    close,
    reopen
}) {
    

    const {userData} =  useUser();
    const [ongoingVote, setOngoingVote] = useState({})
    const {setPermissions} = useQuestion();
    
   function setVote(){
        if(protect.length > 0){setOngoingVote({users : protect, type : "protect"})}
        if(close.length >  0){setOngoingVote({users : close, type : "close"})}
        if(reopen.length > 0){setOngoingVote({users : reopen, type : "open"})}
   }

    

    let level = 0;
    let protection = false;

    let canProtect = false;
    let canClose = false;
    let canComment = false;
    let canAnswer = true;
    let canVote = true;
    let canAccept = false;
    
    

    if(userData.username){
        level = userData.level;
        if(status === 'protected' || status === 'closed'){protection = true;}
        if(userData.username === creator && !hasAcceptedAnswer){canAccept = true}
        if(level >= 7 && ongoingVote.type !== "protect"){canClose = true}
        if(level >= 6 && !protection && ongoingVote.type !== "close"){canProtect = true}
        if((level >= 3 && !protection) || (status === 'protected' && level >= 5) || (userData.username === creator)){canComment = true}
        if((status === 'protected' && level < 5) || status === 'closed'){canAnswer = false}
        if(status === 'closed' || level < 2){canVote = false}
    }else{
        canAnswer = false;
    }
    useEffect(()=>{
        setPermissions({canVote: canVote, canComment: canComment, canAccept: canAccept })
        setVote();
    },[canVote, canComment, canAccept])

    useEffect(()=>{
        updateQuestion(question_id, {views: "increment"})
    },[])

    function changeProtect(){
        protectQuestion(question_id, userData)
    }
    function changeClose(){
        if(status === 'open'){
            closeQuestion(question_id, userData)
        }else{
            openQuestion(question_id, userData)
        }
        
    }

    const getVote = () => getQuestionVote(question_id);
    const updateVote = (data) => updateQuestionVote(question_id, data);
    
    const postComment = (data) => postQuestionComment(question_id, data);
    
    return (
        <>
            <Box m={2}>
                <Typography variant='h4'>{title}</Typography>
                <Typography display='inline' m={1}>Views: {views}</Typography>
                <Typography display='inline' m={1}>Answers: {answers}</Typography>
                <Typography display='inline' m={1}>Comments: {comments}</Typography>
                <Typography display='inline' m={1}>Status:</Typography>
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

                <Tooltip title = {!canClose && "You must be level 7"}>
                    <span>
                    <Button disabled = {!canClose} style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained" onClick = {changeClose}>Close/Open</Button>
                    </span>
                </Tooltip>

                <Tooltip title = {!canProtect && "You must be  level 6 and this question must be open" }>
                    <span>
                    <Button disabled = {!canProtect} style={{'marginLeft': '10px'}}display = 'inline' m = {1} variant = "contained" onClick = {changeProtect}>Protect</Button>
                    </span>
                </Tooltip>

                {Object.keys(ongoingVote).length > 0 && <Typography>{ongoingVote.users.toString()} - voting to {ongoingVote.type} this question </Typography>}
            </Box>
            <Divider />

            <ListItem disablePadding>
                <VoteControl
                    {...{
                        downvotes,
                        getVote,
                        orientation: 'vertical',
                        updateVote,
                        upvotes
                    }}
                />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CommentControl  {...{ postComment, canComment}} />
                </ListItemText>
            </ListItem>
            <CreateAnswer />
        </>
    );
}
