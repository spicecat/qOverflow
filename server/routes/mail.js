var express = require('express');
var router = express.Router();

const tokenAuth = require('../middleware/tokenAuth');

const GetMail = require('./mail/Get');
const SendMail = require('./mail/Send');

router.get('/', tokenAuth, GetMail);
router.post('/', tokenAuth, SendMail);

module.exports = router;
