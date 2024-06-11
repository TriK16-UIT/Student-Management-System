const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: { 
        type: String, 
        enum: ['Math', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Literature', 'Ethics', 'PE'],
        required: true,
        unique: true
    },
})

module.exports = mongoose.model('Subject', subjectSchema)
