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

router.post('/', tokenAuth, CreateQuestion);
router.get('/search', Search);
router.get('/:questionID', GetQuestion);
router.patch('/:questionID', tokenAuth, EditQuestion);
router.post('/:questionID/answers', tokenAuth, CreateAnswer);
router.post('/:questionID/comments', tokenAuth, CreateComment);
router.post('/:questionID/answers/:answerID/comments', tokenAuth, CreateAnswerComment);
router.patch('/:questionID/answers/:answerID', tokenAuth, EditAnswer);
router.delete('/:questionID/:answerID/:commentID', tokenAuth, DeleteAnswerComment);
router.delete('/:questionID/comments/:commentID', tokenAuth, DeleteComment);

module.exports = router;
