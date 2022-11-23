const express = require('express');
const router = express.Router();

const basicAuth = require('../middleware/basicAuth');
const tokenAuth = require('../middleware/tokenAuth');

const Answers = require('./user/Answers');
const GetBadges = require('./user/GetBadges');
const Delete = require('./user/Delete');
const Edit = require('./user/Edit');
const GetUser = require('./user/GetUser');
const Login = require('./user/Login');
const Logout = require('./user/Logout');
const Questions = require('./user/Questions');
const Register = require('./user/Register');
const Remember = require('./user/Remember');
const RequestReset = require('./user/RequestReset');
const ResetPassword = require('./user/ResetPassword');

router.post('/', Register);
router.patch('/', tokenAuth, Edit);
router.get('/questions', tokenAuth, Questions);
router.get('/answers', tokenAuth, Answers);
router.get('/badges', tokenAuth, GetBadges);
router.post('/login', basicAuth, Login);
router.get('/remember', tokenAuth, Remember);
router.delete('/logout', tokenAuth, Logout);
router.delete('/delete', tokenAuth, Delete);
router.post('/reset', RequestReset);
router.post('/reset/:id', ResetPassword);
router.get('/:username', GetUser);

module.exports = router;
