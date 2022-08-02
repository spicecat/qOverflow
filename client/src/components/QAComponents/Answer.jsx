import { ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import { AnswerProvider } from 'contexts';
import { CreationInfoTag } from 'controllers';
import { AnswerCommentsList, CommentControl, VoteControl } from 'controllers/QAControllers';
import { getAnswerVote, updateAnswerVote } from 'services/questionsServices';

export default function Answer({
    accepted,
    answer_id,
    comments,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes
}) {
    const getVote = () => getAnswerVote(question_id, answer_id);
    const updateVote = (data) => updateAnswerVote(question_id, answer_id, data);

    return (
        <span key={answer_id}>
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
                {/* <AnswerProvider> */}
                <AnswerCommentsList {...{ answer_id, comments }} />
                {/* </AnswerProvider> */}
            </ListItem>
        </span>
    )
}