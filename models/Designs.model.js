const {Schema, model} = require('mongoose')

const designsSchema = new Schema(
        {
        artistDesign: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        title: {
            type: String
        },
        path: {
            type: String
        },
        descriptcion: {
            type: String
          }
        },
)

module.exports = model('Designs', designsSchema)