import Cookies from 'js-cookie';
import { createEndpoint } from './api';

const callQuestionsAPI = createEndpoint('/questions');

const searchQuestions = async (sort) =>
    await callQuestionsAPI('get', `/search`)
        .query(sort)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const postQuestion = async (data) =>
    await callQuestionsAPI('post', ``)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getQuestion = async (questionID) =>
    await callQuestionsAPI('get', `/${questionID}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateQuestion = async (questionID, data) =>
    await callQuestionsAPI('patch', `/${questionID}`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getQuestionVote = async (questionID) =>
    await callQuestionsAPI('get', `/${questionID}/vote`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateQuestionVote = async (questionID, data) =>
    await callQuestionsAPI('patch', `/${questionID}/vote`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getQuestionComments = async (questionID) =>
    await callQuestionsAPI('get', `/${questionID}/comments`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const postQuestionComment = async (questionID, data) =>
    await callQuestionsAPI('post', `/${questionID}/comments`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const deleteQuestionComment = async (questionID, commentID) =>
    await callQuestionsAPI('delete', `/${questionID}/comments/${commentID}`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getCommentVote = async (questionID, commentID) =>
    await callQuestionsAPI('get', `/${questionID}/comments/${commentID}/vote`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateCommentVote = async (questionID, commentID, data) =>
    await callQuestionsAPI('patch', `/${questionID}/comments/${commentID}/vote`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getAnswers = async (questionID) =>
    await callQuestionsAPI('get', `/${questionID}/answers`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const postAnswer = async (questionID, data) =>
    await callQuestionsAPI('post', `/${questionID}/answers`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateAnswer = async (questionID, answerID, data) =>
    await callQuestionsAPI('patch', `/${questionID}/answers/${answerID}`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateAcceptAnswer = async (questionID, answerID) =>
    await callQuestionsAPI('patch', `/${questionID}/answer/${answerID}/accept`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getAnswerVote = async (questionID, answerID) =>
    await callQuestionsAPI('get', `/${questionID}/answers/${answerID}/vote`)
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateAnswerVote = async (questionID, answerID, data) =>
    await callQuestionsAPI(
        'patch',
        `/${questionID}/answers/${answerID}/vote`,
        data
    )
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getAnswerComments = async (questionID, answerID) =>
    await callQuestionsAPI('get', `/${questionID}/answers/${answerID}/comments`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const postAnswerComments = async (questionID, answerID, data) =>
    await callQuestionsAPI(
        'post',
        `/${questionID}/answers/${answerID}/comments`
    )
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const deleteAnswerComment = async (questionID, answerID, commentID) =>
    await callQuestionsAPI(
        'delete',
        `/${questionID}/answers/${answerID}/comments/${commentID}`
    )
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const getAnswerCommentVote = async (questionID, answerID, commentID) =>
    await callQuestionsAPI(
        'get',
        `/${questionID}/answers/${answerID}/comments/${commentID}/vote`
    )
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

const updateAnswerCommentVote = async (questionID, answerID, commentID, data) =>
    await callQuestionsAPI(
        'patch',
        `/${questionID}/answers/${answerID}/comments/${commentID}/vote`
    )
        .set('Authorization', `bearer ${Cookies.get('token')}`)
        .send(data)
        .then((res) => res.body)
        .catch((err) => {
            console.log(err.response.body.error);
            return err.response.body;
        });

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
