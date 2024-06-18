const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSubjectSchema = new Schema({
    ClassID: { 
        type: Number, 
        ref: 'Class', 
        required: true 
    },
    SubjectID: { 
        type: Number, 
        ref: 'Subject', 
        required: true 
    },
    UserID: { 
        type: Number, 
        ref: 'User', 
        required: true 
    },
})

// Create a compound index to enforce unique combinations of ClassID and SubjectID
classSubjectSchema.index({ ClassID: 1, SubjectID: 1 }, { unique: true })

module.exports = mongoose.model('ClassSubject', classSubjectSchema)
