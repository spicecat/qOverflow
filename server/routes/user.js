var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const Answers = require('./user/Answers');
const Edit = require('./user/Edit');
const GetUser = require('./user/GetUser');
const Login = require('./user/Login');
const Logout = require('./user/Logout');
const Questions = require('./user/Questions');
const Register = require('./user/Register');
const RequestReset = require('./user/RequestReset');
const ResetPassword = require('./user/ResetPassword');

router.get('/:username', GetUser);
router.get('/questions', tokenAuth, Questions);
router.get('/answers', tokenAuth, Answers);
router.get('/logout', tokenAuth, Logout);
router.get('/reset', RequestReset);
router.post('/login', basicAuth, Login);
router.post('/register', Register);
router.post('/reset/:id', ResetPassword);
router.patch('/', tokenAuth, Edit);

module.exports = router;