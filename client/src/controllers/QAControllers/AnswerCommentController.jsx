import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';
import { AnswerComment } from 'components/QAComponents';

export default function AnswerCommentController({ answer_id, comment_id, question_id, ...props }) {
    const getVote = () => getAnswerCommentVote(question_id, answer_id, comment_id);
    const updateVote = (data) => updateAnswerCommentVote(question_id, answer_id, comment_id, data);

    return <AnswerComment {...{ ...props, getVote, updateVote }} />;
}