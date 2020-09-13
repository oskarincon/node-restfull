const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('../models/user')
const bcr = require('bcrypt')

app.use(bodyParser.json({ type: 'application/json' }))

app.post('/login', function(req, res) {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                err
            })
        }
        if(usuarioDB === null || !bcr.compareSync( body.password, usuarioDB.password)){
            return res.status(500).json({
                status: '400',
                err: 'email o cliente erroneos'
            })
        }
        
        let token = jwt.sign({
            usuarioDB
          }, process.env.SEED, { expiresIn: process.env.TIME_OUT });
        
        return res.json({
            status: '200',
            token
        })
    })
});


module.exports = app;