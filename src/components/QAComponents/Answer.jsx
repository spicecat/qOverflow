import { ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import { AnswerCommentsList, CreationInfoTag, VoteControl } from '../../controllers';
import { getAnswerVote, updateAnswerVote } from '../../services/questionsServices';

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
    const getVote = (username) => getAnswerVote(question_id, answer_id, username);
    const updateVote = (username, data) => updateAnswerVote(question_id, answer_id, username, data);

    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <ButtonGroup orientation='vertical'>
                    <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
                    {accepted && (
                        <div style={{ textAlign: 'center' }}>
                            <Tooltip title='Accepted Answer' placement='right'>
                                <CheckIcon color='success' />
                            </Tooltip>
                        </div>
                    )}
                </ButtonGroup>
                <ListItemText>
                    <ReactMarkdown>
                        {text}
                    </ReactMarkdown>
                    <CreationInfoTag {...{ createdAt, creator, text: 'answered' }} />
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerCommentsList {...{ answer_id, comments, question_id }} />
            </ListItem>
        </span>
    )
}