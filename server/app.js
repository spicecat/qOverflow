const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const cron = require('node-cron');

const { refreshQuestions, refreshUsers } = require('server/utils/cronRefresh');

if (!process.env.LOADED) require('dotenv-json')();

/**
 * Get port from environment and store in Express.
 */

mongoose.connect(process.env.DB_CONN_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
});

mongoose.connection.once('open', () => console.log('[INFO]: MongoDB connected'));
mongoose.connection.on(
    'error',
    console.error.bind(console, '[ERROR]: MongoDB connection error - ')
);

cron.schedule('*/30 * * * * *', refreshQuestions);
cron.schedule('*/2 * * * *', refreshUsers);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    return parseInt(val, 10) || val;
}

const userRouter = require('./routes/user');
const mailRouter = require('./routes/mail');
const questionRouter = require('./routes/question');

const app = express();

app.disable('x-powered-by');

if (process.env.NODE_ENV !== 'production') {
    app.use(cors());
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', userRouter);
app.use('/api/mail', mailRouter);
app.use('/api/questions', questionRouter);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

module.exports = app;