import { useEffect } from 'react';
import { Divider, ListItem, ListItemText } from '@mui/material';
import { useAnswer } from 'contexts';
import { CreationInfoTag } from 'controllers';
import { VoteControl } from 'controllers/QAControllers';
import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';

export default function AnswerComment({
    answer_id,
    _id: comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    question_id,
    upvotes
}) {
    const { answerData, setAnswerData } = useAnswer();

    const getVote = () => getAnswerCommentVote(question_id, answer_id, comment_id);
    const updateVote = (data) => updateAnswerCommentVote(question_id, answer_id, comment_id, data);

    useEffect(() => {
        setAnswerData(answerData + answer_id);
    }, [])

    return (
        <span key={comment_id}>
            <ListItem disablePadding>
                <ListItemText>
                    <CreationInfoTag {...{ createdAt, creator, text: 'commented' }} />
                    {text}
                    <VoteControl {...{ downvotes, getVote, updateVote, upvotes }} />
                    {/* <button onClick={()=>console.log(11, answer_id, answerData)}>asdf</button> */}
                </ListItemText>
            </ListItem>
            <Divider />
        </span >
    );
}