var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetMail = require('./mail/Get');
const SendMail = require('./mail/Send');

router.post('/', tokenAuth, SendMail);
router.get('/', tokenAuth, GetMail);

module.exports = router;
