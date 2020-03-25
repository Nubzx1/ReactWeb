const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newtonsfrom = new Schema(
    {
        fc: { type: String, required: false },
        X: { type: Number, required: false }
    }
)

module.exports = mongoose.model('newtons', newtonsfrom)