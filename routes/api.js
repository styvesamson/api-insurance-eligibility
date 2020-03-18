var express = require("express");
var authRouter = require("./auth");
var customerRouter = require("./customer");

var app = express();

app.use("/auth/", authRouter);
app.use("/customer/", customerRouter);

module.exports = app;