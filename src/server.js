require('../config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json({ type: 'application/json' }))

app.get('/usuario', function(req, res) {
    res.json('Hello World')
});

app.post('/usuario', function(req, res) {

    if (typeof req.body.name !== 'undefined') {
        res.json(req.body)
    } else {
        res.status(400).json({
            error: 400,
            mensaje: 'no se envio nombre'
        })
    }
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        id: id
    })
});

app.delete('/usuario', function(req, res) {
    res.json('Hello World')
});



app.listen(port)