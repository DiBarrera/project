const {Schema, model} = require('mongoose')

const designsSchema = new Schema(
        {
        artistDesign: {
            type: String,
            trim: true,
            required: true,
        },
        title: {
            type: String
        },
        path: {
            type: String
        },
        description: {
            type: String
          }
        },
)

module.exports = model('Designs', designsSchema)