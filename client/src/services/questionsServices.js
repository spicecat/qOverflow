import { createEndpoint } from './api';

const callQuestionsAPI = createEndpoint('/questions');

const searchQuestions = async (sort) =>
    callQuestionsAPI(
        'get',
        `/search`,
        sort
    );

const postQuestion = async (data) =>
    callQuestionsAPI(
        'post',
        ``,
        data
    );

const getQuestion = async (questionID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}`
    );

const updateQuestion = async (questionID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}`,
        data
    );

const getQuestionVote = async (questionID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/vote`
    );

const updateQuestionVote = async (questionID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/vote`,
        data
    );

const getQuestionComments = async (questionID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/comments`
    );

const postQuestionComment = async (questionID, data) =>
    callQuestionsAPI(
        'post',
        `/${questionID}/comments`,
        data
    );

const deleteQuestionComment = async (questionID, commentID) =>
    callQuestionsAPI(
        'delete',
        `/${questionID}/comments/${commentID}`
    );

const getCommentVote = async (questionID, commentID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/comments/${commentID}/vote`
    );

const updateCommentVote = async (questionID, commentID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/comments/${commentID}/vote`,
        data
    );

const getAnswers = async (questionID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/answers`
    );

const postAnswer = async (questionID, data) =>
    callQuestionsAPI(
        'post',
        `/${questionID}/answers`,
        data
    );

const updateAnswer = async (questionID, answerID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/answers/${answerID}`,
        data
    );

const updateAcceptAnswer = async (questionID, answerID) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/answer/${answerID}/accept`
    );

const getAnswerVote = async (questionID, answerID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/answers/${answerID}/vote`
    );

const updateAnswerVote = async (questionID, answerID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/answers/${answerID}/vote`,
        data
    );

const getAnswerComments = async (questionID, answerID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/answers/${answerID}/comments`
    );

const postAnswerComments = async (questionID, answerID, data) =>
    callQuestionsAPI(
        'post',
        `/${questionID}/answers/${answerID}/comments`,
        data
    );

const deleteAnswerComment = async (questionID, answerID, commentID) =>
    callQuestionsAPI(
        'delete',
        `/${questionID}/answers/${answerID}/comments/${commentID}`
    );

const getAnswerCommentVote = async (questionID, answerID, commentID) =>
    callQuestionsAPI(
        'get',
        `/${questionID}/answers/${answerID}/comments/${commentID}/vote`
    );

const updateAnswerCommentVote = async (questionID, answerID, commentID, data) =>
    callQuestionsAPI(
        'patch',
        `/${questionID}/answers/${answerID}/comments/${commentID}/vote`,
        data
    );

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
    postAnswerComments,
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
};
