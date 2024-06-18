const mongoose = require('mongoose')

const Schema = mongoose.Schema

const configSchema = new Schema({
    minAge: {
        type: Number,
        required: true, 
        default: 15
    },
    maxAge: {
        type: Number,
        required: true,
        default: 20
    },
    maxClassSize: {
        type: Number,
        required: true,
        default: 40
    },
    passingGrade: {
        type: Number,
        required: true,
        default: 5
    }
})

module.exports = mongoose.model('Config', configSchema)