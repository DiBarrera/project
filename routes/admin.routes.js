const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Admin = require('../models/Admin.model')
const uploadCloud = require('../configs/cloudinary.config')
const Designs = require('../models/Designs.model')



router.get('/upload-img', (req, res, next ) => {
  res.render('admin/upload-design')
})

router.post('/upload-img', uploadCloud.single('design'), (req, res, next) => {
  const { artistDesign, title, description } = req.body
  console.log('---------', req.body, req.file)
  const { path } = req.file
  Designs.create({
    artistDesign, title, design, description
  })
   .then((respuestaDeLaBaseDeDatosCuandoCreeElDiseño) => {
     res.redirect('/gallery')
   })
   .catch(console.log(error))
})

router.get('/gallery', (req, res, next) => {
  Designs.find()
    .then((respuestaDeLaBaseDeDatosCuandoEncuentraTodosLosDiseños) => {
      const informacionQueVoyAMandarALaVista = respuestaDeLaBaseDeDatosCuandoEncuentraTodosLosDiseños
      res.render('gallery',  { informacionQueVoyAMandarALaVista })
    })
  res.render('gallery')
})
module.exports = router;