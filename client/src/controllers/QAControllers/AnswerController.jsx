import { Answer } from 'components/QAComponents';
import {
    getAnswerVote,
    postAnswerComment,
    updateAcceptAnswer,
    updateAnswerVote,
} from 'services/questionsServices';

export default function AnswerController({ answer_id, question_id, ...props }) {
    const acceptAnswer = () => updateAcceptAnswer(question_id, answer_id);
    const getVote = () => getAnswerVote(question_id, answer_id);
    const updateVote = (data) => updateAnswerVote(question_id, answer_id, data);
    const postComment = async (data) => { await postAnswerComment(question_id, answer_id, data); };

    return (
        <Answer
            {...{
                ...props,
                getVote,
                updateVote,
                postComment,
                acceptAnswer,
                answer_id,
                question_id,
            }}
        />
    );
}
