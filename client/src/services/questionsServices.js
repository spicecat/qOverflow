import { createEndpoint } from './api';

const callQuestionsAPI = createEndpoint('/questions');

const searchQuestions = async (sort) =>
    callQuestionsAPI('get', `/search`, sort);

const postQuestion = async (data) => callQuestionsAPI('post', ``, data);

const getQuestion = async (question_id) =>
    callQuestionsAPI('get', `/${question_id}`);

const updateQuestion = async (question_id, data) =>
    callQuestionsAPI('patch', `/${question_id}`, data);

const getQuestionVote = async (question_id) =>
    callQuestionsAPI('get', `/${question_id}/vote`);

const updateQuestionVote = async (question_id, data) =>
    callQuestionsAPI('patch', `/${question_id}/vote`, data);

const getQuestionComments = async (question_id, data) =>
    callQuestionsAPI('get', `/${question_id}/comments`, data);

const postQuestionComment = async (question_id, data) =>
    callQuestionsAPI('post', `/${question_id}/comments`, data);

const deleteQuestionComment = async (question_id, comment_id) =>
    callQuestionsAPI('delete', `/${question_id}/comments/${comment_id}`);

const getCommentVote = async (question_id, comment_id) =>
    callQuestionsAPI('get', `/${question_id}/comments/${comment_id}/vote`);

const updateCommentVote = async (question_id, comment_id, data) =>
    callQuestionsAPI(
        'patch',
        `/${question_id}/comments/${comment_id}/vote`,
        data
    );

const getAnswers = async (question_id, data) =>
    callQuestionsAPI('get', `/${question_id}/answers`, data);

const postAnswer = async (question_id, data) =>
    callQuestionsAPI('post', `/${question_id}/answers`, data);

const updateAnswer = async (question_id, answer_id, data) =>
    callQuestionsAPI('patch', `/${question_id}/answers/${answer_id}`, data);

const updateAcceptAnswer = async (question_id, answer_id) =>
    callQuestionsAPI('patch', `/${question_id}/answer/${answer_id}/accept`);

const getAnswerVote = async (question_id, answer_id) =>
    callQuestionsAPI('get', `/${question_id}/answers/${answer_id}/vote`);

const updateAnswerVote = async (question_id, answer_id, data) =>
    callQuestionsAPI(
        'patch',
        `/${question_id}/answers/${answer_id}/vote`,
        data
    );

const getAnswerComments = async (question_id, answer_id) =>
    callQuestionsAPI('get', `/${question_id}/answers/${answer_id}/comments`);

const postAnswerComment = async (question_id, answer_id, data) =>
    callQuestionsAPI(
        'post',
        `/${question_id}/answers/${answer_id}/comments`,
        data
    );

const deleteAnswerComment = async (question_id, answer_id, comment_id) =>
    callQuestionsAPI(
        'delete',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}`
    );

const getAnswerCommentVote = async (question_id, answer_id, comment_id) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote`
    );

const updateAnswerCommentVote = async (
    question_id,
    answer_id,
    comment_id,
    data
) =>
    callQuestionsAPI(
        'patch',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote`,
        data
    );

const editQuestionStatus = async (question_id, operation) =>
    callQuestionsAPI('patch', `/${question_id}/${operation}`);

export {
    getAnswerCommentVote,
    getAnswerVote,
    getCommentVote,
    getQuestionVote,
    deleteAnswerComment,
    deleteQuestionComment,
    getAnswerComments,
    getAnswers,
    getQuestion,
    getQuestionComments,
    postAnswer,
    postAnswerComment,
    postQuestion,
    postQuestionComment,
    searchQuestions,
    updateAnswer,
    updateAcceptAnswer,
    updateAnswerCommentVote,
    updateAnswerVote,
    updateCommentVote,
    updateQuestion,
    updateQuestionVote,
    editQuestionStatus,
};
