const mongoose = require('mongoose')
const Schema = mongoose.Schema

const falsepositionfrom = new Schema(
    {
        fc: { type: String, required: false },
        XL: { type: Number, required: false },
        XR: { type: Number, required: false }
    }
)

module.exports = mongoose.model('falsepositions', falsepositionfrom)