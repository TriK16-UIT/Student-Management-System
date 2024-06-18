const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    StudentID: {
        type: Number,
        required: true
    },
    ClassID: { 
        type: Number, 
        ref: 'Class', 
        required: false 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    dateOfBirth: { 
        type: Date, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    gender: { 
        type: String,
        enum: ['male', 'female'],
        required: true 
    },
})

studentSchema.index({ StudentID: 1 }, { unique: true })

module.exports = mongoose.model('Student', studentSchema)
