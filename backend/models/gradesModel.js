const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gradesSchema = new Schema({
    StudentID: { 
        type: Number, 
        ref: 'Student', 
        required: true 
    },
    SubjectID: { 
        type: Number, 
        ref: 'Subject', 
        required: true 
    },
    term: { 
        type: String,
        enum: ["I", "II"], 
        required: true 
    },
    score15Min: { 
        type: Number, 
        required: false
    },
    score45Min: { 
        type: Number, 
        required: false 
    },
    scoreAverage: { 
        type: Number, 
        required: false 
    },
});

gradesSchema.index({ StudentID: 1, SubjectID: 1 , term: 1}, { unique: true })

module.exports = mongoose.model('Grades', gradesSchema);
