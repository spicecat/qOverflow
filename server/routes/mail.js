const express = require('express');
const router = express.Router();

const tokenAuth = require('server/middleware/tokenAuth');

const GetMail = require('./mail/Get');
const SendMail = require('./mail/Send');

router.get('/', tokenAuth, GetMail);
router.post('/', tokenAuth, SendMail);

module.exports = router;
