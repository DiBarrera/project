const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const uploadCloud = require('../configs/cloudinary.config')

const Admin= require('../models/Admin.model')
const Designs= require('../models/Designs.model')

// GET
router.get('/upload-design', (req, res, next) => {
  res.render('upload-form')
})

// POST
router.post('/upload-design',  uploadCloud.single('design'), (req, res, next) => {
  const { artistDesign, title } = req.body

  res.redirect('/adminProfile')
})

module.exports = router;