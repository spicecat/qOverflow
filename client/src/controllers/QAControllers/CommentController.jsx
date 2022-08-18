import { useUser } from 'contexts';
import { Comment } from 'components/QAComponents';
import { getCommentVote, deleteQuestionComment, updateCommentVote } from 'services/questionsServices';


export default function CommentController({ comment_id, question_id, ...props }) {
    const { userData } = useUser();

    const getVote = () => getCommentVote(question_id, comment_id);
    const updateVote = (data) => updateCommentVote(question_id, comment_id, data);
    const onDelete = async () => {
        if (userData?.username === props?.creator) {
            const { status } = await deleteQuestionComment(question_id, comment_id);
            if (status === 200)
                window.location.reload(false);
        }
    }

    return <Comment {...{ getVote, onDelete, updateVote, ...props }} />;
}
