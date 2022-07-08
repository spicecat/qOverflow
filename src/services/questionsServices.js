import superagent from 'superagent';
import { API, API_KEY } from '../var';

const questionsApi = API + '/questions';

const searchQuestions = async () => {
    const URL = `${questionsApi}`;

    try {
        const { user } = await superagent.get(URL).set('key', API_KEY);
        return user;
    } catch (err) {
        return err.status;
    }
};

const postQuestion = async () => { };

const getQuestion = async () => { };

const updateQuestion = async () => { };

const checkQuestionVote = async () => { };

const updateQuestionVote = async () => { };

const getQuestionComments = async () => { };

const postQuestionComment = async () => { };

const deleteQuestionComment = async () => { };

const checkCommentVote = async () => { };

const updateCommentVote = async () => { };

const getAnswers = async () => { };

const postAnswer = async () => { };

const updateAnswer = async () => { };

const checkAnswerVote = async () => { };

const updateAnswerVote = async () => { };

const getAnswerComments = async () => { };

const postAnswerComments = async () => { };

const deleteAnswerComment = async () => { };

const checkAnswerCommentVote = async () => { };

const updateAnswerCommentVote = async () => { };

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
    updateQuestionVote
};
