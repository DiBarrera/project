const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_KEY,
  api_secret:process.env.COUDINARY_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'diseños',
  allowedFormats: ['jpg', 'png'],
  params: {resource_type: 'raw'},
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})

module.exports = multer({storage})