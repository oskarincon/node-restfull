const mongoose = require('mongoose')
const mongooseUnique = require('mongoose-unique-validator')

let Schema = mongoose.Schema;
let roleValid = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es valido'
}

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Es requerido el nombre de usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario el email']
    },
    password: {
        type: String,
        requiered: [true, 'Es necesario el password']
    },
    img: {
        type: String,
        requiered: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roleValid
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject
}

userSchema.plugin(mongooseUnique, { message: '{PATH} debe ser unico' })

module.exports = mongoose.model('user', userSchema);