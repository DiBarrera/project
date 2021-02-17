const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRound = 10
const mongoose = require('mongoose');
const User = require('../models/User.model.js')
const saltRounds = 10;

// POST - REGISTRO
router.post('/signup', (req, res, next) => {
  const { username, email, password } = req.body;
 
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res
      .status(500)
      .render('auth/signup', { errorMessage: 'La contraseña necesita tener al menos 6 caracteres y debe contener un numero, una minuscula y una mayuscula.' });
    return;
  }


  if (!username || !email || !password) {
    res.render('auth/signup', { errorMessage: 'Todos los campos son obligatorios. Porfavor escriba un nombre de usuario, correo y contraseña.' });
    return;
  }

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Nuevo usuario creado: ', userFromDB);
      res.redirect('userProfile');
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render('auth/signup', { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.status(500).render('auth/signup', {
           errorMessage: 'El usuario y la contraseña debe ser únicos. O el nombre de usuario o correo ya estan en uso.'
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

module.exports = router;