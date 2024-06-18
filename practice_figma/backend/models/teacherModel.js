const mongoose = require('mongoose')

const Schema = mongoose.Schema

const teacherSchema = new Schema({
    UserID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        unique: true
    },
    SubjectID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Subject', 
        required: true 
    },
})
module.exports = mongoose.model('Teacher', teacherSchema)
