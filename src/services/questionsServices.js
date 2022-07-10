import { createEndpoint } from '../var';

const callQuestionsAPI = createEndpoint('/questions');

const searchQuestions = (data) => // { after, match, regexMatch, sort }
    callQuestionsAPI(
        'get',
        `/search`,
        data
    );

const postQuestion = (data) => // { creator, status, title, text }
    callQuestionsAPI(
        'post',
        ``,
        data
    );

const getQuestion = (question_id) =>
    callQuestionsAPI(
        'get',
        `/${question_id}`
    );

const updateQuestion = (question_id, data) =>  // { status, title, text, views, upvotes, downvotes }
    callQuestionsAPI(
        'patch',
        `/${question_id}`,
        data
    );

const checkQuestionVote = (question_id, username) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/vote/${username}`
    );

const updateQuestionVote = (question_id, username, data) => // { operation, target }
    callQuestionsAPI(
        'patch',
        `/${question_id}/vote/${username}`,
        data
    );

const getQuestionComments = (question_id, data) => // { after }
    callQuestionsAPI(
        'get',
        `/${question_id}/comments`,
        data
    );

const postQuestionComment = (question_id, data) => // { creator, text }
    callQuestionsAPI(
        'post',
        `/${question_id}`,
        data
    );

const deleteQuestionComment = (question_id, comment_id) =>
    callQuestionsAPI(
        'delete',
        `/${question_id}/comments/${comment_id}`
    );

const checkCommentVote = (question_id, comment_id, username) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/comments/${comment_id}/vote/${username}`
    );

const updateCommentVote = (
    question_id,
    comment_id,
    username,
    data
) => //{ operation, target }
    callQuestionsAPI(
        'patch',
        `/${question_id}/comments/${comment_id}/vote/${username}`,
        data
    );

const getAnswers = (question_id) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/answers`
    );

const postAnswer = (question_id, data) => // { creator, text }
    callQuestionsAPI(
        'post',
        `/${question_id}/answers`,
        data
    );

const updateAnswer = (question_id, answer_id, data) => // { text, upvotes, downvotes, accepted }
    callQuestionsAPI(
        'patch',
        `/${question_id}/answers/${answer_id}`,
        data
    );

const checkAnswerVote = (question_id, answer_id, username) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/answers/${answer_id}/vote/${username}`
    );

const updateAnswerVote = (question_id, answer_id, username, data) => // { operation, target }
    callQuestionsAPI(
        'patch',
        `/${question_id}/answers/${answer_id}/vote/${username}`,
        data
    );

const getAnswerComments = (question_id, answer_id) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/answers/${answer_id}/comments`
    );

const postAnswerComments = (question_id, answer_id, data) => // { creator, text }
    callQuestionsAPI(
        'post',
        `/${question_id}/answers/${answer_id}/comments`,
        data
    );

const deleteAnswerComment = (question_id, answer_id, comment_id) =>
    callQuestionsAPI(
        'delete',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}`
    );

const checkAnswerCommentVote = (
    question_id,
    answer_id,
    comment_id,
    username
) =>
    callQuestionsAPI(
        'get',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${username}`
    );

const updateAnswerCommentVote = (
    question_id,
    answer_id,
    comment_id,
    username,
    data
) => // { operation, target }
    callQuestionsAPI(
        'patch',
        `/${question_id}/answers/${answer_id}/comments/${comment_id}/vote/${username}`,
        data
    );

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
