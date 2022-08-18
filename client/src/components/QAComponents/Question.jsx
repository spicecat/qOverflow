import {
    Box,
    Button,
    Chip,
    Divider,
    ListItem,
    ListItemText,
    Tooltip,
    Typography,
    TextField
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Markdown } from 'components';
import { CreationInfoTag } from 'controllers';
import { CommentControl, VoteControl } from 'controllers/QAControllers';

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
    question_id,
    answers,
    comments,
    creator,
    createdAt,
    downvotes,
    hasAcceptedAnswer,
    status,
    title,
    text,
    upvotes,
    views,
    ongoingVote,
    canClose,
    canProtect,
    canComment,
    changeClose,
    changeProtect,
    getVote,
    updateVote,
    postComment,
    canBounty,
    handleBounty,
    hasBounty,
    show,
}) {
    const min = 75;
    const max = 500;
    const [value, setValue] = useState(75);
    canBounty = canBounty && !hasBounty

    function handleBountyFix(){
        handleBounty(value)
    }
    return (
        
        <>
            <Box m={2}>
                <Typography variant='h4'>{title}</Typography>
                <Typography display='inline' m={1}>
                    Views: {views}
                </Typography>
                <Typography display='inline' m={1}>
                    Answers: {answers}
                </Typography>
                <Typography display='inline' m={1}>
                    Comments: {comments}
                </Typography>
                <Typography display='inline' m={1}>
                    Status:
                </Typography>
                <Chip color={statusColor(status)} label={status} size='small' />

                <Typography display='inline' m={1}>
                    Accepted Answer:
                </Typography>
                <Chip
                    color={hasAcceptedAnswer ? 'success' : 'error'}
                    label={hasAcceptedAnswer ? 'yes' : 'no'}
                    size='small'
                />
                <Button
                    component={Link}
                    to='../ask'
                    style={{ marginLeft: '10px' }}
                    display='inline'
                    m={1}
                    variant='contained'
                >
                    Ask question
                </Button>

                <Tooltip title={canClose ? '' : 'You must be level 7'}>
                    <span>
                        <Button
                            disabled={!canClose}
                            style={{ marginLeft: '10px' }}
                            display='inline'
                            m={1}
                            onClick={changeClose}
                            variant='contained'
                        >
                            Close/Open
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip
                    title={canProtect ? '' : 'You must be  level 6 and this question must be open'}
                >
                    <span>
                        <Button
                            disabled={!canProtect}
                            style={{ marginLeft: '10px' }}
                            display='inline'
                            m={1}
                            variant='contained'
                            onClick={changeProtect}
                        >
                            Protect
                        </Button>
                    </span>
                </Tooltip>

                <Tooltip
                    title={canBounty ? '' : 'You must be level 4 and this question must be open or protected'}
                >
                    <span>
                    
                        <Button
                            disabled={!canBounty}
                            style={{ marginLeft: '10px' }}
                            display='inline'
                            m={1}
                            variant='contained'
                            onClick={handleBountyFix}
                        >
                            Add Bounty
                       
                        </Button>
                    { show && 
                        <TextField value = {value} size = "small" type = "number" inputProps={{min,max}} disabled = {!canBounty} label="bounty" onChange={(e) => {
                        if (e.target.value === "") {
                        setValue(75);
                        return;
                        }
                        const value = e.target.value;
                        if (value > max) {
                        setValue(max);
                        } else if (value < min) {
                        setValue(min);
                        } else {
                        setValue(value);
                        }
                        
                        
                    }}/>
                    }
                    </span>
                </Tooltip>

                {ongoingVote.users.length > 0 && (
                    <Typography>
                        {ongoingVote.users.toString()} - voting to {ongoingVote.type} this question{' '}
                    </Typography>
                )}
                 {hasBounty && (
                    <Typography>
                        there is a {hasBounty} point bounty on this question
                    </Typography>
                )}

            </Box>
            <Divider />

            <ListItem disablePadding>
                <VoteControl
                    {...{
                        downvotes,
                        getVote,
                        orientation: 'vertical',
                        updateVote,
                        upvotes,
                        creator,
                    }}
                />
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator }} />
                    <Markdown content={text} />
                    <CommentControl {...{ postComment, canComment }} />
                    <CopyToClipboard text={`${window.location.origin}/questions/${question_id}`}>
                        <Button
                            color='inherit'
                            size='small'
                            m={1}
                            startIcon={<ShareIcon />}
                            style={{ textTransform: 'none' }}
                            variant='text'
                        >
                            Share
                        </Button>
                    </CopyToClipboard>
                </ListItemText>
            </ListItem>
        </>
    );
}
