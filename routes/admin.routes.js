const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../models/Admin.model')
const Designs = require('../models/Designs.model')
const uploadCloud = require('../configs/cloudinary.config')



router.get('/upload-design', (req, res, next ) => {
  res.render('admin/upload-design')
})

router.get('/adminProfile', (req, res, next ) => {
  res.render('admin/adminProfile')
})

router.post('/upload-design', uploadCloud.single('design'), (req, res, next) => {
  req.session
  const { artistDesign, title, description } = req.body
  const { path } = req.file
  console.log('---------', req.body, req.file)
  Designs.create({
    artistDesign, title, design, description
  })
   .then((designToDataBase) => {
     console.log(designToDataBase)
     res.redirect('/gallery')
   })
   .catch(console.log(error))
})

router.get('/gallery', (req, res, next) => {
  Designs.find()
    .then((oneDesignFound) => {
      const uploadInfo = oneDesignFound
      res.render('gallery',  { uploadInfo })
    })
})

module.exports = router;