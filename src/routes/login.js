const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('../models/user')
const bcr = require('bcrypt')
const {
    OAuth2Client
} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);



app.use(bodyParser.json({
    type: 'application/json'
}))

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({
        email: body.email
    }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                err
            })
        }
        if (usuarioDB === null || !bcr.compareSync(body.password, usuarioDB.password)) {
            return res.status(500).json({
                status: '400',
                err: 'email o cliente erroneos'
            })
        }

        let token = jwt.sign({
            usuarioDB
        }, process.env.SEED, {
            expiresIn: process.env.TIME_OUT
        });

        return res.json({
            status: '200',
            token
        })
    })
});

let verify = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
    });
    const payload = ticket.getPayload();

    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/googleLogin', async (req, res) => {
    let token = req.body.idtoken;
    let usuarioGmail = await verify(token)
        .catch(e=> {
            return res.status(400).json({
                status: '400',
                err
            });
        })
        Usuario.findOne({email: usuarioGmail.email}, (err, usuarioDB)=> {
            if (err) {
                return res.status(500).json({
                    status: '500',
                    err
                })
            }
            if(usuarioDB) {
                if(usuarioDB.google === false){
                    return res.status(400).json({
                        status: '400',
                        err: 'debe loguearse por password'
                    })
                }else {
                    let token = jwt.sign({
                        usuarioDB
                    }, process.env.SEED, {
                        expiresIn: process.env.TIME_OUT
                    })
                    return res.json({
                        status: '200',
                        token
                    })
                }
            } else {

                let usuario = new Usuario();
                usuario.name= usuarioGmail.name,
                usuario.email= usuarioGmail.email,
                usuario.img= usuarioGmail.picture,
                usuario.password= ':)',
                usuario.google= true

                usuario.save((err, userDB)=> {
                    if(err) {

                        return res.status(500).json({
                            status: '500',
                            err
                        })
                    }
                    let token = jwt.sign({
                        userDB
                    }, process.env.SEED, {
                        expiresIn: process.env.TIME_OUT
                    })
                    return res.json({
                        status: '200',
                        token
                    })
                })
            }
        })


})


module.exports = app;