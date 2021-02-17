const {Schema, model} = require('mongoose')

const userSchema = new Schema(
        {
        username: {
            type: String,
            trim: true,
            required: [true, 'Usuario es requerido'],
            unique: true
        },
        nombre: {
            type: String
        },
        apellido: {
            type: String
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Email es requerido'],
            unique: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Porfavor, inserte una dirección de correo valida.']
        },
        telefono: {
            type: String,
            trim: true,
            unique: true
        },
        passwordHash: {
            type: String,
            required: [true, 'Password es requerido']
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('User', userSchema)