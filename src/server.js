require('./config/config')
const routes = require('./routes/routes')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const app = express()

app.use(routes);

app.use(express.static(path.resolve( __dirname , '../public')))

mongoose.connect(process.env.NODE_ENV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;

    console.log('Run base datos');
});



app.listen(process.env.PORT)