import superagent from 'superagent';
import { API, API_KEY, callAPI } from '../var';

const questionsAPI = API + '/questions';

const searchQuestions = async (after, match, regexMatch, sort) => {
    const URL = `${questionsAPI}/search`;

    try {
        const res = await superagent
            .get(URL)
            .query({ after, match, regexMatch, sort })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);
        return res;
    } catch (err) {
        return err.status;
    }
};

const postQuestion = async (creator, status, title, text) => {
    const URL = `${questionsAPI}`;

    try {
        const res = await superagent
            .post(URL)
            .send({
                creator,
                status,
                title,
                text,
            })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getQuestion = async question_id => {

    try {
        const { question } = await callAPI('get', `/questions/${question_id}`)
        return question
    } catch (err) {
        return err.status;
    }
};

const updateQuestion = async (question_id, body) => {
    const URL = `${questionsAPI}/${question_id}`;

    try {
        const res = await superagent
            .patch(URL)
            .send(body)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const checkQuestionVote = async (question_id, username) => {
    const URL = `${questionsAPI}/${question_id}/vote/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateQuestionVote = async (question_id, username, operation, target) => {
    const URL = `${questionsAPI}/${question_id}/vote/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send({ operation, target })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getQuestionComments = async (question_id, after) => {
    const URL = `${questionsAPI}/${question_id}/comments`;

    try {
        const res = await superagent
            .get(URL)
            .query({ after })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const postQuestionComment = async (question_id, creator, text) => {
    const URL = `${questionsAPI}/${question_id}`;

    try {
        const res = await superagent
            .post(URL)
            .send({ creator, text })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const deleteQuestionComment = async (question_id, commentID) => {
    const URL = `${questionsAPI}/${question_id}/comments/${commentID}`;

    try {
        const res = await superagent
            .delete(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const checkCommentVote = async (question_id, commentID, username) => {
    const URL = `${questionsAPI}/${question_id}/comments/${commentID}/vote/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateCommentVote = async (
    question_id,
    commentID,
    username,
    operation,
    target
) => {
    const URL = `${questionsAPI}/${question_id}/comments/${commentID}/vote/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send({ operation, target })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getAnswers = async (question_id) => {
    const URL = `${questionsAPI}/${question_id}/answers`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const postAnswer = async (question_id, creator, text) => {
    const URL = `${questionsAPI}/${question_id}/answers`;

    try {
        const res = await superagent
            .post(URL)
            .send({ creator, text })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.bodres);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateAnswer = async (question_id, answerID, body) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}`;

    try {
        const res = await superagent
            .patch(URL)
            .send(body)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const checkAnswerVote = async (question_id, answerID, username) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/vote/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateAnswerVote = async (question_id, answerID, username, body) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/vote/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send(body)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const getAnswerComments = async (question_id, answerID) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/comments`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const postAnswerComments = async (question_id, answerID, creator, text) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/comments`;

    try {
        const res = await superagent
            .post(URL)
            .send({ creator, text })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const deleteAnswerComment = async (question_id, answerID, commentID) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/comments/${commentID}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const checkAnswerCommentVote = async (
    question_id,
    answerID,
    commentID,
    username
) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/comments/${commentID}/vote/${username}`;

    try {
        const res = await superagent
            .get(URL)
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
    } catch (err) {
        return err.status;
    }
};

const updateAnswerCommentVote = async (
    question_id,
    answerID,
    commentID,
    username,
    operation,
    target
) => {
    const URL = `${questionsAPI}/${question_id}/answers/${answerID}/comments/${commentID}/vote/${username}`;

    try {
        const res = await superagent
            .patch(URL)
            .send({ operation, target })
            .set('Authorization', `bearer ${API_KEY}`)
            .then((res) => res.body);

        return res;
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
