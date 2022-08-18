import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import { Button, ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
    acceptAnswer,
    canComment,
    canAccept,
    postComment,
    getVote,
    updateVote,
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
                    <CopyToClipboard text={`${window.location.href}#${answer_id}`}>
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
                    {canAccept && (
                        <span>
                            <Button
                                color='inherit'
                                size='small'
                                onClick={acceptAnswer}
                                style={{ textTransform: 'none' }}
                                variant='text'
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
