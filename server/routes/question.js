const express = require('express');
const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

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
const EditQuestionBody = require('./question/EditQuestionBody');
const EditQuestionBounty = require('./question/EditQuestionBounty');
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
router.get('/:question_id', GetQuestion);
router.patch('/:question_id', tokenAuth, EditQuestion);
router.patch('/:question_id/edit', tokenAuth, EditQuestionBody);
router.patch('/:question_id/addBounty', tokenAuth, EditQuestionBounty);
router.patch('/:question_id/close', tokenAuth, EditQuestionStatusClosed);
router.patch('/:question_id/protect', tokenAuth, EditQuestionStatusProtected);
router.patch('/:question_id/reopen', tokenAuth, EditQuestionStatusReopened);
router.get('/:question_id/vote', tokenAuth, GetQuestionVote);
router.patch('/:question_id/vote', tokenAuth, EditQuestionVote);

router.get('/:question_id/comments', GetComments);
router.post('/:question_id/comments', tokenAuth, CreateComment);
router.delete('/:question_id/comments/:comment_id', tokenAuth, DeleteComment);
router.get('/:question_id/comments/:comment_id/vote', tokenAuth, GetCommentVote);
router.patch('/:question_id/comments/:comment_id/vote', tokenAuth, EditCommentVote);

router.get('/:question_id/answers', GetAnswers);
router.post('/:question_id/answers', tokenAuth, CreateAnswer);
router.patch('/:question_id/answers/:answer_id', tokenAuth, EditAnswer);
router.patch('/:question_id/answers/:answer_id/accept', tokenAuth, EditAnswerAccepted);
router.get('/:question_id/answers/:answer_id/vote', tokenAuth, GetAnswerVote);
router.patch('/:question_id/answers/:answer_id/vote', tokenAuth, EditAnswerVote);

router.get('/:question_id/answers/:answer_id/comments', GetAnswerComments);
router.post('/:question_id/answers/:answer_id/comments', tokenAuth, CreateAnswerComment);
router.delete(
    '/:question_id/answers/:answer_id/comments/:comment_id',
    tokenAuth,
    DeleteAnswerComment
);
router.get(
    '/:question_id/answers/:answer_id/comments/:comment_id/vote',
    tokenAuth,
    GetAnswerCommentVote
);
router.patch(
    '/:question_id/answers/:answer_id/comments/:comment_id/vote',
    tokenAuth,
    EditAnswerCommentVote
);

module.exports = router;
