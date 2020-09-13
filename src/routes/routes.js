const express = require('express')
const app = express()
const user = require('./user')
const login = require('./login')

app.use(user);
app.use(login);


module.exports = app;


