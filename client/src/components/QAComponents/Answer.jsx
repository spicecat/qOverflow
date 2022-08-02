import { ButtonGroup, ListItem, ListItemText, Tooltip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ReactMarkdown from 'react-markdown';
import { CreationInfoTag } from 'controllers';
import { useUser } from 'contexts';
import {
    AnswerCommentsList,
    CommentControl,
    VoteControl,
} from 'controllers/QAControllers';
import {
    getAnswerVote,
    updateAnswerVote,
    postAnswerComment,
} from 'services/questionsServices';

export default function Answer({
    accepted,
    answer_id,
    comments,
    creator,
    createdAt,
    downvotes,
    question_id,
    text,
    upvotes,
}) {
    const {
        userData: { level, username },
    } = useUser();
    const getVote = () => getAnswerVote(question_id, answer_id);
    const updateVote = (data) => updateAnswerVote(question_id, answer_id, data);
    const canComment = level >= 3 || creator === username;

    const postComment = (data) =>
        postAnswerComment(question_id, answer_id, data);

    return (
        <span key={answer_id}>
            <ListItem disablePadding>
                <ButtonGroup orientation='vertical'>
                    <VoteControl
                        {...{
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
                    <CreationInfoTag
                        {...{ createdAt, creator, text: 'answered' }}
                    />
                    <ReactMarkdown>{text}</ReactMarkdown>
                    <CommentControl {...{ canComment, postComment }} />
                </ListItemText>
            </ListItem>
            <ListItem sx={{ pl: 8 }}>
                <AnswerCommentsList {...{ answer_id, comments }} />
            </ListItem>
        </span>
    );
}
