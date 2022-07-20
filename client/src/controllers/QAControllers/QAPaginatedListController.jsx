import { useQuestion } from 'contexts';
import { PaginatedList } from 'controllers';
import { Answer, AnswerComment, Comment } from 'components/QAComponents';
import { getAnswerComments, getAnswers, getQuestionComments } from 'services/questionsServices';

export function AnswerCommentsList({ answer_id, comments: count }) {
    const { questionData: { question_id } } = useQuestion();

    const getData = () =>
        getAnswerComments(question_id, answer_id)
            .then(({ comments }) => comments.map(comment => ({ ...comment, answer_id, question_id })))
            .catch(() => []);

    return <PaginatedList {...{ count, Component: AnswerComment, getData }} />;
}

export function AnswersList() {
    const { questionData: { answers: count, question_id } } = useQuestion();

    const sortByPoints = answers => answers.sort((a, b) => b.upvotes - b.downvotes - a.upvotes + a.downvotes);

    const getData = () =>
        getAnswers(question_id)
            .then(({ answers }) => sortByPoints(answers).map(answer => ({ ...answer, question_id })))
            .catch(() => []);

    return count && (
        <PaginatedList {...{ count, Component: Answer, getData }} />
    );
}

export function CommentsList() {
    const { questionData: { comments: count, question_id } } = useQuestion();

    const getData = () =>
        getQuestionComments(question_id)
            .then(({ comments }) => comments.map(comment => ({ ...comment, question_id })))
            .catch(() => []);

    return count && (
        <PaginatedList {...{ count, Component: Comment, getData }} />
    );
}
