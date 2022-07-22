import { ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import { AnswerProvider } from 'contexts';
import { CreationInfoTag } from 'controllers';
import { AnswerCommentsList, CommentControl, VoteControl } from 'controllers/QAControllers';
import { getAnswerVote, updateAnswerVote } from 'services/questionsServices';

export default function Answer({
    accepted,
    _id,
    comments,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes
}) {
    const getVote = (username) => getAnswerVote(question_id, _id, username);
    const updateVote = (username, data) => updateAnswerVote(question_id, _id, username, data);

    return (
        <span key={_id}>
            <ListItem disablePadding>
                <ButtonGroup orientation='vertical'>
                    <VoteControl {...{ downvotes, getVote, orientation: 'vertical', updateVote, upvotes }} />
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
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CommentControl />
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerProvider>
                    <AnswerCommentsList {...{ answer_id: _id, comments }} />
                </AnswerProvider>
            </ListItem>
        </span>
    )
}