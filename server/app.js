const express = require("express");
const cookieParser = require("cookie-parser");

const { authorizeMiddleware } = require('./middleware/auth');

const loginRouter = require('./routes/login');
const studentRouter = require('./routes/students');
const counselorRouter = require('./routes/counselors');
const classRouter = require('./routes/classes');
const dormitoryRouter = require('./routes/dormitories');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', authorizeMiddleware, loginRouter);
app.use('/api/student', studentRouter);
app.use('/api/counselor', counselorRouter);
app.use('/api/classes', classRouter);
app.use('/api/dormitory', dormitoryRouter);

module.exports = app;