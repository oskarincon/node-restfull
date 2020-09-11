const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Usuario = require('../models/user')
const bcr = require('bcrypt')
    //utilizado para definir que campos son permitidos en el body del modelo
const _ = require('underscore')

app.use(bodyParser.json({ type: 'application/json' }))

// /usuario?from=10&limit=2
app.get('/usuario', function(req, res) {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    Usuario.find({}, 'name email role')
        .skip(from)
        .limit(limit)
        .exec((err, UsuarioDB) => {
            if (err) {
                return res.status(500).json({
                    status: '500',
                    err
                })
            }
            Usuario.count({}, (err, total) => {
                if (err) throw new Error(`error ${err}`)
                return res.json({
                    status: '200',
                    UsuarioDB,
                    total
                })

            })


        })
});

/* /usuario
 body = {
    "name": "pepino",
    "email": "oiskarincon10@gmail.com",
    "password": "123",
    "role": "ADMIN_ROLE"
}
*/
app.post('/usuario', function(req, res) {

    let user = new Usuario({
        name: req.body.name,
        email: req.body.email,
        password: bcr.hashSync(req.body.password, 10),
        role: req.body.role
    })

    user.save((err, UsuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                err
            })
        }


        return res.json({
            status: '200',
            UsuarioDB
        })
    })
});

/* /usuario/id
body: {
    "name": "pepino",
    "email": "oiskarincon10@gmail.com",
    "password": "123",
    "role": "ADMIN_ROLE"
}
*/
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, UsuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                err
            })
        }

        res.json({
            status: '200',
            UsuarioDB
        })


    })


});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, UsuarioDB) => {
        if (err) {
            return res.status(500).json({
                status: '500',
                err
            })
        }

        if (UsuarioDB === null) {
            return res.status(500).json({
                status: '500',
                err: 'usuario no existe'
            })
        }

        res.json({
            status: '200',
            UsuarioDB
        })


    })
});



module.exports = app;