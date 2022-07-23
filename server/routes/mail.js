const express = require('express');
const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const tc = require('../utils/trycatch');

const GetMail = require('./mail/Get');
const SendMail = require('./mail/Send');

router.get('/', ...tc(tokenAuth, GetMail));
router.post('/', ...tc(tokenAuth, SendMail));

module.exports = router;
