const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/user');
const mailRouter = require('./routes/mail');
const questionRouter = require('./routes/question');

const app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/mail', mailRouter);
app.use('/questions', questionRouter);

module.exports = app;
