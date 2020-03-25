const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cramerfrom = new Schema(
    {
        matrixA: { type: Array, required: false },
        matrixB: { type: Array, required: false },
        
    }
)

module.exports = mongoose.model('cramers', cramerfrom)