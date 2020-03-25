const mongoose = require('mongoose')
const Schema = mongoose.Schema

const difffrom = new Schema(
    {
        fc: { type: String, required: false },
        X: { type: Number, required: false },
        H: { type: Number, required: false },
        Diff: { type: Number, required: false },
    }
)

module.exports = mongoose.model('diffs', difffrom)