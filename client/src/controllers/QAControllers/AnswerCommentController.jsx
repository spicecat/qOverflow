import { useUser } from 'contexts';
import { AnswerComment } from 'components/QAComponents';
import { getAnswerCommentVote, deleteAnswerComment, updateAnswerCommentVote } from 'services/questionsServices';

export default function AnswerCommentController({ answer_id, comment_id, question_id, ...props }) {
    const { userData } = useUser();

    const getVote = () => getAnswerCommentVote(question_id, answer_id, comment_id);
    const updateVote = (data) => updateAnswerCommentVote(question_id, answer_id, comment_id, data);
    const onDelete = async () => {
        if (userData?.username === props?.creator) {
            const { status } = await deleteAnswerComment(question_id, answer_id, comment_id);
            if (status === 200)
                window.location.reload(false);
        }
    }

    return <AnswerComment {...{ getVote, onDelete, updateVote, ...props }} />;
}
