const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interpofrom = new Schema(
    {
        matrixA: { type: Array, required: false },
        matrixB: { type: Array, required: false },
        Xn: {type: Number, required: false}
    }
)

module.exports = mongoose.model('interpos', interpofrom)