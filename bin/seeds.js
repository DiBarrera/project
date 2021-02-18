const mongoose = require('mongoose')
const Admin = require('../models/Admin.model.js')

const DB_NAME = 'project'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const artists = [
    {
        admin: 'Admin 1',
        nombre: 'Nombre 1',
        apellido: 'Apellido 1',
        email: 'correo1@gmail.com',
        telefono: '722 000 0001',
        passwordHash: '123456789abcABC'
    },
    {
      admin: 'Admin 2',
      nombre: 'Nombre 2',
      apellido: 'Apellido 2',
      email: 'correo2@gmail.com',
      telefono: '722 000 0002',
      passwordHash: '234567891abcABC'
    },
    {
      admin: 'Admin 3',
      nombre: 'Nombre 3',
      apellido: 'Apellido 3',
      email: 'correo3@gmail.com',
      telefono: '722 000 0003',
      passwordHash: '345678912abcABC'
    },
    {
      admin: 'Admin 4',
      nombre: 'Nombre 4',
      apellido: 'Apellido 4',
      email: 'correo4@gmail.com',
      telefono: '722 000 0004',
      passwordHash: '456789123abcABC'
    },
]

Admin.create(artists)
    .then(adminsToDataBase => {
        console.log(`Se han agregado ${adminsToDataBase.length} admins a la base de datos.`)
        mongoose.connection.close()
    })
    .catch(error => console.log(`Ocurrio un error al conectarse a la base de datos ${error}. `))
