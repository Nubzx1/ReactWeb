const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onepointfrom = new Schema(
    {
        fc: { type: String, required: false },
        X: { type: Number, required: false }
    }
)

module.exports = mongoose.model('onepoints', onepointfrom)