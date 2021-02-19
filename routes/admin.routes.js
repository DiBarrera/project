const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../models/Admin.model')
const Designs = require('../models/Designs.model')
const uploadCloud = require('../configs/cloudinary.config')



router.get('/upload-design', (req, res, next ) => {
  const {currentUser} = req.session
  res.render('admin/upload-design', currentUser)
})

router.post('/upload-design', uploadCloud.single('design'), (req, res, next) => {
  const { artistDesign, title, descriptcion } = req.body
  console.log(req.body)
  const { path } = req.file
  console.log('---------', req.body, req.file)
  Designs.create({
    artistDesign, title, path, descriptcion
  })
   .then((designToDataBase) => {
     console.log(designToDataBase)
     res.redirect('/gallery')
   })
   .catch(error => console.log(error))
})

router.get('/gallery', (req, res, next) => {
  Designs.find()
    .then((oneDesignFound) => {
      const uploadInfo = oneDesignFound
      res.render('gallery',  { uploadInfo })
    })
})

router.get('/edit/:_id', (req, res, next) => {
  const id = req.params._id
  Designs.findById(id)
  .then((responseDB) => {
    res.render('edit', {responseDB})
  })
})

router.post('/edit/:juanito', uploadCloud.single('design'), (req, res, next) => {
  const id = req.params.juanito
  const { artistDesign, title, descriptcion } = req.body
  if (!req.file) {
    Designs.findByIdAndUpdate(id, {$set: {artistDesign, title, descriptcion}}, {new: true})
      .then((respuestaBaseDatos) => {
      res.redirect('/gallery')
    })
  } else {
    const elArchivo = req.file.path
      Designs.findByIdAndUpdate(id, {$set: {artistDesign, title, descriptcion, path:elArchivo}}, {new: true})
      .then((respuestaBaseDatos) => {
       res.redirect('/gallery')
    })
  }
})

router.post('/delete/:juanito', uploadCloud.single('design'), (req, res, next) => {
  const id = req.params.juanito
  Designs.findByIdAndRemove(id)
  .then((deleteFromDataBase) => {
    res.redirect('/gallery')
  })
})

module.exports = router;