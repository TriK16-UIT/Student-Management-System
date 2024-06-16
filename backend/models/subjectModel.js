const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Subject', subjectSchema)
