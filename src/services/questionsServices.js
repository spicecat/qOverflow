import { createEndpoint } from '../var';

const callQuestionsAPI = createEndpoint('/questions');

const searchQuestions = async data => { // { creator, status, title, text }
    try {
        const { questions } = await callQuestionsAPI(
            'get',
            `/search`,
            data
        );
        return questions;
    } catch (err) {
        return err.status;
    }
};

const postQuestion = async data => { // { creator, status, title, text }
    try {
        const { success } = await callQuestionsAPI(
            'post',
            `/`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const getQuestion = async question_id => {
    try {
        const { question } = await callQuestionsAPI(
            'get',
            `/${question_id}`
        );
        return question;
    } catch (err) {
        return err.status;
    }
};

const updateQuestion = async (question_id, data) => { // { status, title, text, views, upvotes, downvotes }
    try {
        const { success } = await callQuestionsAPI(
            'patch',
            `/${question_id}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const checkQuestionVote = async (question_id, username) => {
    try {
        const { vote } = await callQuestionsAPI(
            'get',
            `/${question_id}/vote/${username}`
        );
        return vote;
    } catch (err) {
        return err.status;
    }
};

const updateQuestionVote = async (question_id, username, data) => { // { operation, target }
    try {
        const { success } = await callQuestionsAPI(
            'patch',
            `/${question_id}/vote/${username}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const getQuestionComments = async (question_id, data) => { // { after }
    try {
        const { comments } = await callQuestionsAPI(
            'get',
            `/${question_id}/comments`,
            data
        );
        return comments;
    } catch (err) {
        return err.status;
    }
};

const postQuestionComment = async (question_id, data) => { // { creator, text }
    try {
        const { success } = await callQuestionsAPI(
            'post',
            `/${question_id}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const deleteQuestionComment = async (question_id, comment_id) => {
    try {
        const { success } = await callQuestionsAPI(
            'delete',
            `/${question_id}/comments/${comment_id}`
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const checkCommentVote = async (question_id, comment_id, username) => {
    try {
        const { vote } = await callQuestionsAPI(
            'get',
            `/${question_id}/comments/${comment_id}/vote/${username}`
        );
        return vote;
    } catch (err) {
        return err.status;
    }
};

const updateCommentVote = async (
    question_id,
    comment_id,
    username,
    data
) => { //{ operation, target }
    try {
        const { vote } = await callQuestionsAPI(
            'patch',
            `/${question_id}/comments/${comment_id}/vote/${username}`,
            data
        );
        return vote;
    } catch (err) {
        return err.status;
    }
};

const getAnswers = async (question_id) => {
    try {
        const { answers } = await callQuestionsAPI(
            'get',
            `/${question_id}/answers`
        );
        return answers;
    } catch (err) {
        return err.status;
    }
};

const postAnswer = async (question_id, data) => { // { creator, text }
    try {
        const { success } = await callQuestionsAPI(
            'post',
            `/${question_id}/answers`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const updateAnswer = async (question_id, answer_id, data) => { // { text, upvotes, downvotes, accepted }
    try {
        const { success } = await callQuestionsAPI(
            'patch',
            `/${question_id}/answers/${answer_id}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const checkAnswerVote = async (question_id, answer_id, username) => {
    try {
        const { vote } = await callQuestionsAPI(
            'get',
            `/${question_id}/answers/${answer_id}/vote/${username}`
        );
        return vote;
    } catch (err) {
        return err.status;
    }
};

const updateAnswerVote = async (question_id, answer_id, username, data) => { // { operation, target }
    try {
        const { success } = await callQuestionsAPI(
            'patch',
            `/${question_id}/answers/${answer_id}/vote/${username}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const getAnswerComments = async (question_id, answer_id) => {
    try {
        const { comments } = await callQuestionsAPI(
            'get',
            `/${question_id}/answers/${answer_id}/comments`
        );
        return comments;
    } catch (err) {
        return err.status;
    }
};

const postAnswerComments = async (question_id, answer_id, data) => { // { creator, text }
    try {
        const { success } = await callQuestionsAPI(
            'post',
            `/${question_id}/answers/${answer_id}/comments`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const deleteAnswerComment = async (question_id, answer_id, comment_id) => {
    try {
        const { success } = await callQuestionsAPI(
            'delete',
            `/${question_id}/answers/${answer_id}/comments/${comment_id}`
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

const checkAnswerCommentVote = async (
    question_id,
    answer_id,
    comment_id,
    username
) => {
    try {
        const { vote } = await callQuestionsAPI(
            'get',
            `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${username}`
        );
        return vote;
    } catch (err) {
        return err.status;
    }
};

const updateAnswerCommentVote = async (
    question_id,
    answer_id,
    comment_id,
    username,
    data
) => { // { operation, target }
    try {
        const { success } = await callQuestionsAPI(
            'patch',
            `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${username}`,
            data
        );
        return success;
    } catch (err) {
        return err.status;
    }
};

export {
    checkAnswerCommentVote,
    checkAnswerVote,
    checkCommentVote,
    checkQuestionVote,
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
    updateAnswerCommentVote,
    updateAnswerVote,
    updateCommentVote,
    updateQuestion,
    updateQuestionVote,
};
