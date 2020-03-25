const mongoose = require('mongoose')
const Schema = mongoose.Schema

const intersfrom = new Schema(
    {
        fc: { type: String, required: false },
        a: { type: Number, required: false },
        b: { type: Number, required: false },
        n: { type: Number, required: false }
    }
)

module.exports = mongoose.model('inters', intersfrom)