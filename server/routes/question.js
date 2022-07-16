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
const EditQuestion = require('./question/EditQuestion');
const GetQuestion = require('./question/GetQuestion');
const Search = require('./question/Search');
const UpdateQuestionVote = require('./question/UpdateQuestionVote');
const UpdateQuestionCommentVote = require('./question/UpdateQuestionCommentVote');
const UpdateQuestionAnswerVote = require('./question/UpdateQuestionAnswerVote');
const UpdateQuestionAnswerCommentVote = require('./question/UpdateQuestionAnswerCommentVote');

router.get('/search', Search);
router.get('/:questionID', GetQuestion);
router.patch('/:questionID', tokenAuth, EditQuestion);
router.post('/', tokenAuth, CreateQuestion);
router.post('/:questionID/comment', tokenAuth, CreateComment);
router.post('/:questionID/answer', tokenAuth, CreateAnswer);
router.post('/:questionID/:answerID/comment', tokenAuth, CreateAnswerComment);
router.patch('/:questionID/:answerID', tokenAuth, EditAnswer);
router.patch('/:questionID/vote');
router.patch('/:questionID/comments/:commentID/vote');
router.patch('/:questionID/answers/:answerID/vote');
router.patch('/:questionID/answers/:answerID/comments/:commentID/vote');
router.delete(
    '/:questionID/:answerID/:commentID',
    tokenAuth,
    DeleteAnswerComment
);
router.delete('/:questionID/:commentID', tokenAuth, DeleteComment);

module.exports = router;
