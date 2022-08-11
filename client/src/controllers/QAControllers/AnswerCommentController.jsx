import { getAnswerCommentVote, updateAnswerCommentVote } from 'services/questionsServices';
import { useQuestion } from 'contexts';
import { AnswerComment } from 'components/QAComponents';

export default function AnswerCommentController({ answer_id, comment_id, question_id, ...props }) {
    const {
        permissions: { canVote },
    } = useQuestion();

    const getVote = () => getAnswerCommentVote(question_id, answer_id, comment_id);
    const updateVote = (data) => updateAnswerCommentVote(question_id, answer_id, comment_id, data);

    return <AnswerComment {...{ ...props, canVote, getVote, updateVote }} />;
}
