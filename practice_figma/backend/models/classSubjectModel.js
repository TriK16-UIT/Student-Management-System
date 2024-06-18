const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSubjectSchema = new Schema({
    ClassID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Class', 
        required: true 
    },
    SubjectID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
    TeacherID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Teacher'
    },
})

// Create a compound index to enforce unique combinations of ClassID and SubjectID
classSubjectSchema.index({ ClassID: 1, SubjectID: 1 }, { unique: true })

module.exports = mongoose.model('ClassSubject', classSubjectSchema)
