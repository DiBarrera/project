const {Schema, model} = require('mongoose')

const adminSchema = new Schema(
        {
        artista: {
            type: String,
            trim: true,
            required: true,
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

module.exports = model('Admin', adminSchema)