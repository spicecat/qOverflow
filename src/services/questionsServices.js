import superagent from 'superagent';
import { API, API_KEY } from '../var';

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

const getQuestion = async (questionID) => {
    const URL = `${questionsAPI}/${questionID}`;

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

const updateQuestion = async (questionID, body) => {
    const URL = `${questionsAPI}/${questionID}`;

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

const checkQuestionVote = async (questionID, username) => {
    const URL = `${questionsAPI}/${questionID}/vote/${username}`;

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

const updateQuestionVote = async (questionID, username, operation, target) => {
    const URL = `${questionsAPI}/${questionID}/vote/${username}`;

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

const getQuestionComments = async (questionID, after) => {
    const URL = `${questionsAPI}/${questionID}/comments`;

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

const postQuestionComment = async (questionID, creator, text) => {
    const URL = `${questionsAPI}/${questionID}`;

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

const deleteQuestionComment = async (questionID, commentID) => {
    const URL = `${questionsAPI}/${questionID}/comments/${commentID}`;

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

const checkCommentVote = async (questionID, commentID, username) => {
    const URL = `${questionsAPI}/${questionID}/comments/${commentID}/vote/${username}`;

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
    questionID,
    commentID,
    username,
    operation,
    target
) => {
    const URL = `${questionsAPI}/${questionID}/comments/${commentID}/vote/${username}`;

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

const getAnswers = async (questionID) => {
    const URL = `${questionsAPI}/${questionID}/answers`;

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

const postAnswer = async (questionID, creator, text) => {
    const URL = `${questionsAPI}/${questionID}/answers`;

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

const updateAnswer = async (questionID, answerID, body) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}`;

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

const checkAnswerVote = async (questionID, answerID, username) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/vote/${username}`;

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

const updateAnswerVote = async (questionID, answerID, username, body) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/vote/${username}`;

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

const getAnswerComments = async (questionID, answerID) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/comments`;

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

const postAnswerComments = async (questionID, answerID, creator, text) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/comments`;

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

const deleteAnswerComment = async (questionID, answerID, commentID) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/comments/${commentID}`;

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
    questionID,
    answerID,
    commentID,
    username
) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/comments/${commentID}/vote/${username}`;

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
    questionID,
    answerID,
    commentID,
    username,
    operation,
    target
) => {
    const URL = `${questionsAPI}/${questionID}/answers/${answerID}/comments/${commentID}/vote/${username}`;

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
