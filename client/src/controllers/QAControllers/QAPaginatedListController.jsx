import { useQuestion } from 'contexts';
import { PaginatedList } from 'controllers';
import { Answer, AnswerComment, Comment } from 'controllers/QAControllers';
import { getAnswerComments, getAnswers, getQuestionComments } from 'services/questionsServices';

export function AnswerCommentsList({ answer_id, comments: count }) {
    const {
        questionData: { question_id },
    } = useQuestion();

    const getData = ({ comment_id }) =>
        getAnswerComments(question_id, answer_id, { after: comment_id })
            .then(({ comments }) =>
                comments.map((comment) => ({ ...comment, answer_id, question_id }))
            )
            .catch(() => []);

    return <PaginatedList {...{ count, Component: AnswerComment, getData }} />;
}

export function AnswersList() {
    const {
        permissions: { canComment, canAccept },
        questionData: { answers: count, loading, question_id },
    } = useQuestion();

    const sortByPoints = (answers) =>
        answers.sort((a, b) => b.upvotes - b.downvotes - a.upvotes + a.downvotes);

    const getData = async ({ answer_id }) => {
        const answersList = await getAnswers(question_id, { after: answer_id })
            .then(({ answers }) =>
                sortByPoints(answers).map((answer) => ({ ...answer, question_id }))
            )
            .catch(() => []);
        const currentLocation = window.location.href;
        const hasAnswerAnchor = currentLocation.includes('#');

        if (hasAnswerAnchor) {
            const anchorAnswerId = `${currentLocation.substring(currentLocation.indexOf("#") + 1)}`;
            answersList.forEach(function (answer, i) {
                if (answer.answer_id === anchorAnswerId) {
                    answersList.splice(i, 1);
                    answersList.unshift(answer);
                }
            });
        }
        if (answersList.length > 2 && answersList[0].answer_id === answersList[1].answer_id)
            answersList.splice(0, 1);

        return answersList;
    }

    const NewAnswer = (props) => <Answer {...{ ...props, canComment, canAccept }} />;

    return !loading && <PaginatedList {...{ count, Component: NewAnswer, getData, scroll: true }} />;
}

export function CommentsList() {
    const {
        questionData: { comments: count, loading, question_id },
    } = useQuestion();

    const sortByCreatedAt = (comments) => comments.sort((a, b) => a.createdAt - b.createdAt);

    const getData = ({ comment_id }) =>
        getQuestionComments(question_id, { after: comment_id })
            .then(({ comments }) =>
                sortByCreatedAt(comments).map((comment) => ({ ...comment, question_id }))
            )
            .catch(() => []);

    return !loading && <PaginatedList {...{ count, Component: Comment, getData }} />;
}
