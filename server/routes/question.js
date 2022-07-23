const express = require('express');
const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const tc = require('../utils/trycatch');

const CreateAnswer = require('./question/CreateAnswer');
const CreateAnswerComment = require('./question/CreateAnswerComment');
const CreateComment = require('./question/CreateComment');
const CreateQuestion = require('./question/CreateQuestion');
const DeleteAnswerComment = require('./question/DeleteAnswerComment');
const DeleteComment = require('./question/DeleteComment');
const EditAnswer = require('./question/EditAnswer');
const EditAnswerAccepted = require('./question/EditAnswerAccepted');
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

router.get('/search', ...tc(Search));

router.post('/', ...tc(tokenAuth, CreateQuestion));
router.get('/:questionID', ...tc(GetQuestion));
router.patch('/:questionID', ...tc(tokenAuth, EditQuestion));
router.patch('/:questionID/close', ...tc(tokenAuth, EditQuestionStatusClosed));
router.patch('/:questionID/protect', ...tc(tokenAuth, EditQuestionStatusProtected));
router.patch('/:questionID/reopen', ...tc(tokenAuth, EditQuestionStatusReopened));
router.get('/:questionID/vote', ...tc(tokenAuth, GetQuestionVote));
router.patch('/:questionID/vote', ...tc(tokenAuth, EditQuestionVote));

router.get('/:questionID/comments', ...tc(GetComments));
router.post('/:questionID/comments', ...tc(tokenAuth, CreateComment));
router.delete('/:questionID/comments/:commentID', ...tc(tokenAuth, DeleteComment));
router.get('/:questionID/comments/:commentID/vote', ...tc(tokenAuth, GetCommentVote));
router.patch('/:questionID/comments/:commentID/vote', ...tc(tokenAuth, EditCommentVote));

router.get('/:questionID/answers', ...tc(GetAnswers));
router.post('/:questionID/answers', ...tc(tokenAuth, CreateAnswer));
router.patch('/:questionID/answers/:answerID', ...tc(tokenAuth, EditAnswer));
router.patch('/:questionID/answers/:answerID/accept', ...tc(tokenAuth, EditAnswerAccepted));
router.get('/:questionID/answers/:answerID/vote', ...tc(tokenAuth, GetAnswerVote));
router.patch('/:questionID/answers/:answerID/vote', ...tc(tokenAuth, EditAnswerVote));

router.get('/:questionID/answers/:answerID/comments', ...tc(GetAnswerComments));
router.post('/:questionID/answers/:answerID/comments', ...tc(tokenAuth, CreateAnswerComment));
router.delete('/:questionID/answers/:answerID/comments/:commentID', ...tc(tokenAuth, DeleteAnswerComment));
router.get('/:questionID/answers/:answerID/comments/:commentID/vote', ...tc(tokenAuth, GetAnswerCommentVote));
router.patch('/:questionID/answers/:answerID/comments/:commentID/vote', ...tc(tokenAuth, EditAnswerCommentVote));

module.exports = router;
