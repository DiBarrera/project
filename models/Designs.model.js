const {Schema, model} = require('mongoose')

const designsSchema = new Schema(
        {
        artistaDiseño: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        nombre: {
            type: String
        },
        descriptcion: {
            type: String
          }
        },
)

module.exports = model('Designs', designsSchema)