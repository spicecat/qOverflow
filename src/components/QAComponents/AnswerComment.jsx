import { useEffect } from 'react';
import { Divider, ListItem, ListItemText } from '@mui/material';
import { useAnswer } from 'contexts';
import { CreationInfoTag, VoteControl } from 'controllers';
import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';

export default function AnswerComment({
    answer_id,
    comment_id,
    creator,
    createdAt,
    downvotes,
    text,
    question_id,
    upvotes
}) {
    const { answerData, setAnswerData } = useAnswer();

    const getVote = (username) => getAnswerCommentVote(question_id, answer_id, comment_id, username);
    const updateVote = (username, data) => updateAnswerCommentVote(question_id, answer_id, comment_id, username, data);

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