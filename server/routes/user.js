const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const tc = require('../utils/trycatch');

const Answers = require('./user/Answers');
const Edit = require('./user/Edit');
const GetUser = require('./user/GetUser');
const Login = require('./user/Login');
const Logout = require('./user/Logout');
const Questions = require('./user/Questions');
const Register = require('./user/Register');
const Remember = require('./user/Remember');
const RequestReset = require('./user/RequestReset');
const ResetPassword = require('./user/ResetPassword');

router.post('/', ...tc(Register));
router.patch('/', ...tc(tokenAuth, Edit));
router.get('/questions', ...tc(tokenAuth, Questions));
router.get('/answers', ...tc(tokenAuth, Answers));
router.post('/login', ...tc(basicAuth, Login));
router.get('/remember', ...tc(tokenAuth, Remember));
router.delete('/logout', ...tc(tokenAuth, Logout));
router.get('/reset', ...tc(RequestReset));
router.post('/reset/:id', ...tc(ResetPassword));
router.get('/:username', ...tc(GetUser));

module.exports = router;
