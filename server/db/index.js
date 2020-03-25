const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://nubzx:Nub57841@cluster0-vi2bi.mongodb.net/Numer', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db