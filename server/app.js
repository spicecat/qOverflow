const cors = require('cors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const userRouter = require('./routes/user');
const mailRouter = require('./routes/mail');
const questionRouter = require('./routes/question');

const app = express();

app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/mail', mailRouter);
app.use('/api/questions', questionRouter);

// app.use(express.static(path.join(__dirname, 'public/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/build/index.html'));
// });

module.exports = app;