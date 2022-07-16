var express = require('express');
var router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const Questions = require('./user/Questions');
const Answers = require('./user/Answers');
const GetUser = require('./user/GetUser');
const Login = require('./user/Login');
const Logout = require('./user/Logout');
const Register = require('./user/Register');
const RequestReset = require('./user/RequestReset');
const ResetPassword = require('./user/ResetPassword');
const Update = require('./user/Update');

router.get('/', GetUser);
router.get('/questions', tokenAuth, Questions);
router.get('/answers', tokenAuth, Answers);
router.get('/login', basicAuth, Login);
router.get('/logout', tokenAuth, Logout);
router.post('/register', Register);
router.get('/reset', RequestReset);
router.post('/reset/:id', ResetPassword);
router.patch('/update', tokenAuth, Update);

module.exports = router;
