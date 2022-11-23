const express = require('express');
const router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetMail = require('./mail/Get');
const SendMail = require('./mail/Send');
const ReadMail = require('./mail/Read');

router.get('/', tokenAuth, GetMail);
router.post('/', tokenAuth, SendMail);
router.patch('/:mail_id', tokenAuth, ReadMail);

module.exports = router;
