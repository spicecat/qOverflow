var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const CreateAnswer = require('./question/CreateAnswer');
const CreateAnswerComment = require('./question/CreateAnswerComment');
const CreateComment = require('./question/CreateComment');
const CreateQuestion = require('./question/CreateQuestion');
const DeleteAnswerComment = require('./question/DeleteAnswerComment');
const DeleteComment = require('./question/DeleteComment');
const EditAnswer = require('./question/EditAnswer');
const EditAnswerCommentVote = require('./question/EditAnswerCommentVote');
const EditAnswerVote = require('./question/EditAnswerVote');
const EditCommentVote = require('./question/EditCommentVote');
const EditQuestion = require('./question/EditQuestion');
const EditQuestionStatusClosed = require('./question/EditQuestionStatusClosed');
const EditQuestionStatusProtected = require('./question/EditQuestionStatusProtected');
const EditQuestionStatusReopened = require('./question/EditQuestionStatusReopened');
const EditQuestionVote = require('./question/EditQuestionVote');
const GetAnswerComments = require('./question/GetAnswerComments');
const GetAnswerCommentVote = require('./question/GetAnswerCommentVote');
const GetAnswers = require('./question/GetAnswers');
const GetAnswerVote = require('./question/GetAnswerVote');
const GetComments = require('./question/GetComments');
const GetCommentVote = require('./question/GetCommentVote');
const GetQuestion = require('./question/GetQuestion');
const GetQuestionVote = require('./question/GetQuestionVote');
const Search = require('./question/Search');

router.get('/search', Search);

router.post('/', tokenAuth, CreateQuestion);
router.get('/:questionID', GetQuestion);
router.patch('/:questionID', tokenAuth, EditQuestion);
router.patch('/:questionID/close', tokenAuth, EditQuestionStatusClosed);
router.patch('/:questionID/protect', tokenAuth, EditQuestionStatusProtected);
router.patch('/:questionID/reopen', tokenAuth, EditQuestionStatusReopened);
router.get('/:questionID/vote', tokenAuth, GetQuestionVote);
router.patch('/:questionID/vote', tokenAuth, EditQuestionVote);

router.get('/:questionID/comments', GetComments);
router.post('/:questionID/comments', tokenAuth, CreateComment);
router.delete('/:questionID/comments/:commentID', tokenAuth, DeleteComment);
router.get('/:questionID/comments/:commentID/vote', tokenAuth, GetCommentVote);
router.patch(
    '/:questionID/comments/:commentID/vote',
    tokenAuth,
    EditCommentVote
);

router.get('/:questionID/answers', GetAnswers);
router.post('/:questionID/answers', tokenAuth, CreateAnswer);
router.patch('/:questionID/answers/:answerID', tokenAuth, EditAnswer);
router.get('/:questionID/answers/:answerID/vote', GetAnswerVote);
router.patch('/:questionID/answers/:answerID/vote', tokenAuth, EditAnswerVote);

router.get('/:questionID/answers/:answerID/comments', GetAnswerComments);
router.post(
    '/:questionID/answers/:answerID/comments',
    tokenAuth,
    CreateAnswerComment
);
router.delete(
    '/:questionID/answers/:answerID/comments/:commentID',
    tokenAuth,
    DeleteAnswerComment
);
router.get(
    '/:questionID/answers/:answerID/comments/:commentID/vote',
    tokenAuth,
    GetAnswerCommentVote
);
router.patch(
    '/:questionID/answers/:answerID/comments/:commentID/vote',
    tokenAuth,
    EditAnswerCommentVote
);

module.exports = router;
