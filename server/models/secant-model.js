const mongoose = require('mongoose')
const Schema = mongoose.Schema

const secantfrom = new Schema(
    {
        fc: { type: String, required: false },
        X: { type: Number, required: false }
    }
)

module.exports = mongoose.model('secants', secantfrom)