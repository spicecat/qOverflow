import { useEffect, useState } from 'react';
import { useQuestion } from 'contexts';
import { PaginatedList } from 'components';
import { Answer, AnswerComment, Comment } from 'components/QAComponents';
import { getAnswerComments, getAnswers, getQuestionComments } from 'services/questionsServices';

const rowsPerPage = 5;
function PaginatedListController({ count = 0, Component, getData }) {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        const loadData = async () => {
            setData(await getData() || [])
        }
        loadData();
    }, [getData]);

    return data && (
        <PaginatedList {...{
            count: Math.ceil(count / rowsPerPage),
            data: data.slice((page - 1) * rowsPerPage, page * rowsPerPage),
            Component,
            handleChangePage,
            page,
            rowsPerPage
        }} />
    );
}

export function AnswerCommentsList({ answer_id, comments: count }) {
    const { questionData: { question_id } } = useQuestion();

    const getData = () =>
        getAnswerComments(question_id, answer_id).then(({ comments }) =>
            comments.map(comment => ({ ...comment, answer_id, question_id }))
        );

    return <PaginatedListController {...{ count, Component: AnswerComment, getData }} />;
}

export function AnswersList() {
    const { questionData: { answers: count, question_id } } = useQuestion();

    const getData = () =>
        getAnswers(question_id).then(({ answers }) =>
            answers.map(answer => ({ ...answer, question_id }))
        );

    return count && (
        <PaginatedListController {...{ count, Component: Answer, getData }} />
    );
}

export function CommentsList() {
    const { questionData: { comments: count, question_id } } = useQuestion();

    const getData = () =>
        getQuestionComments(question_id).then(({ comments }) =>
            comments.map(comment => ({ ...comment, question_id }))
        );

    return count && (
        <PaginatedListController {...{ count, Component: Comment, getData }} />
    );
}
