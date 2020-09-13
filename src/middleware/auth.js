const jwt = require('jsonwebtoken')
const Usuario = require('../models/user')


let authMethod = (req, resp, next) => {
    let token = req.get('token')
    jwt.verify(token, process.env.SEED, (err, encoder)=>{ 
        if(err){
            return resp.status(500).json({
                status: '500',
                err
            })
        }
        req.usuario = encoder.usuarioDB;
        next()
    })
}

let admin_role_Method = (req, resp, next) => {
    let  usuario = req.usuario;
    console.log(usuario.role);
    if(usuario.role === 'ADMIN_ROLE'){
        next()
    }else {
        return resp.status(400).json({
            status: '400',
            err: 'el usuario no es ADMIN'
        })
    }
}

module.exports = {
    authMethod,
    admin_role_Method
}