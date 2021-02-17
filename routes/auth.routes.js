const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRound = 10
const mongoose = require('mongoose');
const Admin = require('../models/Admin.model.js')
const User = require('../models/User.model.js')
const saltRounds = 10;
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

// GET - PERFIL DE USUARIO
router.get('/userProfile', (req, res) => {
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
            // res.render('users/userProfile', { user });

            req.session.currentUser = user;
            res.redirect('/userProfile');

          } else {
            res.render('auth/login', { errorMessage: 'Password incorrecto.' });
          }
        })
        .catch(error => next(error));

})

// Log in Admin

router.post('/login-admin', (req, res, next) => {

  console.log('SESSION =====> ', req.session);
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage2: 'Para ingresar, por favor escriba correo y contraseña.'
    });
    return;
  }

  Admin.findOne({ email })
        .then(user => {

          if (!user) {
            res.render('auth/login', {
              errorMessage2: 'El correo no esta registrado, porfavor intente con otro correo.'
            });
            return;
          }

          else if (bcrypt.compareSync(password, user.passwordHash)) {
            // res.render('users/userProfile', { user });

            req.session.currentUser = user;
            res.redirect('admin/userAdmin');

          } else {
            res.render('auth/login', { errorMessage2: 'Password incorrecto.' });
          }
        })
        .catch(error => next(error));
})

// router.get('/admin/userAdmin', (req, res) => {
//   const
//   res.render('admin/userAdmin', {})
// })

// LOGOUT

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// PRIVADO

router.get('/private' ,(req,res) => {
  
  if(req.session.currentUser) {
    return res.render("private")
  }

  res.send("No estas loggeado, es un área privada.")
})


// EXPORTACIÓN
module.exports = router;