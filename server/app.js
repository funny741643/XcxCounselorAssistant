const express = require("express");
const cookieParser = require("cookie-parser");

const { authorizeMiddleware } = require('./middleware/auth');

const loginRouter = require('./routes/login');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login', authorizeMiddleware, loginRouter);

module.exports = app;