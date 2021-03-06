const express = require("express");
const cookieParser = require("cookie-parser");

const { authorizeMiddleware } = require('./middleware/auth');

const loginRouter = require('./routes/login');
const studentRouter = require('./routes/students');
const counselorRouter = require('./routes/counselors');
const classRouter = require('./routes/classes');
const dormitoryRouter = require('./routes/dormitories');
const checkRouter = require('./routes/check');
const holidayRouter = require('./routes/holiday');
const politicsRouter = require('./routes/politics');
const notificationRouter = require('./routes/notification');
const psyRouter = require('./routes/psy');
const employmentRouter = require('./routes/employment');
const workRouter = require('./routes/work');
const fileRouter = require('./routes/file');

const app = express();

app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', authorizeMiddleware, loginRouter);
app.use('/api/student', studentRouter);
app.use('/api/counselor', counselorRouter);
app.use('/api/classes', classRouter);
app.use('/api/dormitory', dormitoryRouter);
app.use('/api/check', checkRouter);
app.use('/api/holiday', holidayRouter);
app.use('/api/politics', politicsRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/psy', psyRouter);
app.use('/api/employment', employmentRouter);
app.use('/api/work', workRouter);
app.use('/api/file', fileRouter);

module.exports = app;