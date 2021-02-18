const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Admin = require('../models/Admin.model.js')
const User = require('../models/User.model.js')
const saltRounds = 10
const uploadCloud = require('../configs/cloudinary.config')
// RUTAS
// GET - REGISTRO
router.get('/signup', (req, res) => res.render('auth/signup'));
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
      res.redirect('/user-profile');
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
// GET - PERFIL DE USUARIO
router.get('/user-profile', (req, res) => {
  res.render('users/user-profile', { userInSession: req.session.currentUser });
});
// LOGIN
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Para ingresar, por favor escriba correo y contraseña.'
    });
    return;
  }
  User.findOne({ email })
        .then(user => {
          if (!user) {
            res.render('auth/login', {
              errorMessage: 'El correo no esta registrado, porfavor intente con otro correo.'
            });
            return;
          }
          else if (bcrypt.compareSync(password, user.passwordHash)) {
            req.session.currentUser = user;
            res.redirect('/user-profile');
          } else {
            res.render('auth/login', { errorMessage: 'Password incorrecto.' });
          }
        })
        .catch(error => next(error));
})
// LOGIN ADMIN
router.get('/login-admin', (req, res) => res.render('auth/login-admin'));
router.post('/login-admin', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.render('auth/login-admin', {
      errorMessage2: 'Para ingresar, por favor escriba correo y contraseña.'
    });
    return;
  }
  Admin.findOne({ email })
        .then(adminUser => {
          // MIKE: Cambiar a adminUser
          if (!adminUser) {
            res.render('auth/login-admin', {
              errorMessage2: 'El correo no esta registrado, porfavor intente con otro correo.'
            });
            return;
          }
          else if (adminUser.passwordHash) {
            req.session.adminUser = adminUser;
            // MIKE: Cambio a redirect
            res.redirect('/admin/adminProfile');
          } else {
            res.render('auth/login-admin', { errorMessage2: 'Password incorrecto.' });
          }
        })
        .catch(error => next(error));
})
router.get('/admin/adminProfile', (req, res) => {
  console.log(req.session)
  res.render('admin/adminProfile', {cookie: req.session.adminUser })
})
// PRIVADO
// router.get('/private' ,(req,res) => {
//   if(req.session.currentUser) {
//     return res.render("private")
//   }
//   res.send("No estas loggeado, es un área privada.")
// })
// LOGOUT
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
// EXPORTACIÓN
module.exports = router;