const mongoose = require('mongoose')

const Schema = mongoose.Schema

const studentSchema = new Schema({
    ClassID: { 
        type: Schema.Types.ObjectId, 
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
        required: true,
        unique: true
    },
    gender: { 
        type: String,
        enum: ['male', 'female'],
        required: true 
    },
})
module.exports = mongoose.model('Student', studentSchema)
