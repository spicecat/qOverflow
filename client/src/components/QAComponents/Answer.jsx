import CheckIcon from '@mui/icons-material/Check';
import { Button, ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';

import { Markdown } from 'components';
import { CreationInfoTag } from 'controllers';
import { AnswerCommentsList, CommentControl, VoteControl } from 'controllers/QAControllers';

export default function Answer({
    accepted,
    answer_id,
    comments,
    creator,
    createdAt,
    downvotes,
    text,
    upvotes,
    canComment,
    canAccept,
    getVote,
    updateVote,
    postComment,
    acceptAnswer,
}) {
    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <ButtonGroup orientation='vertical'>
                    <VoteControl
                        {...{
                            creator,
                            downvotes,
                            getVote,
                            orientation: 'vertical',
                            updateVote,
                            upvotes,
                        }}
                    />
                    {accepted && (
                        <div style={{ textAlign: 'center' }}>
                            <Tooltip title='Accepted Answer' placement='right'>
                                <CheckIcon color='success' />
                            </Tooltip>
                        </div>
                    )}
                </ButtonGroup>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'answered' }} />
                    <Markdown content={text} />
                    <CommentControl {...{ canComment, postComment }} />
                    {canAccept && (
                        <span>
                            <Button
                                onClick={acceptAnswer}
                                style={{ marginLeft: '10px' }}
                                variant='standard'
                            >
                                Accept
                            </Button>
                        </span>
                    )}
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerCommentsList {...{ answer_id, comments }} />
            </ListItem>
        </span>
    );
}
