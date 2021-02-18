const mongoose = require('mongoose');

mongoose
  .connect('mongodb+srv://diegobarrera:Holamundo2021@cluster0.l2d3j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Conectado a Mongo! Nombre de la base de datos: "${x.connections[0].name}"`))
  .catch(err => console.error('Error al conectarse a Mongo', err));