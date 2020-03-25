const mongoose = require('mongoose')
const Schema = mongoose.Schema

const polyregfrom = new Schema(
    {
        matrixA: { type: Array, required: false },
        matrixB: { type: Array, required: false },
        pow:{ type: Number,required: false},
        Xn:{ type: Number,required: false},
        n:{ type: Number,required: false}
    }
)

module.exports = mongoose.model('polyregs', polyregfrom)