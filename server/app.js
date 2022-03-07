const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }))

module.exports = app;