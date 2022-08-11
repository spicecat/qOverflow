import { getCommentVote, updateCommentVote } from 'services/questionsServices';
import { Comment } from 'components/QAComponents';

export default function CommentController({ comment_id, question_id, ...props }) {
    const getVote = () => getCommentVote(question_id, comment_id);
    const updateVote = (data) => updateCommentVote(question_id, comment_id, data);

    return <Comment {...{ getVote, updateVote, ...props }} />;
}
