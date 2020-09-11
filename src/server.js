require('./config/config')
const user = require('./routes/user')
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(user);

mongoose.connect(configdb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;

    console.log('Run base datos');
});



app.listen(port)