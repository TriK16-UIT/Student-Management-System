const mongoose = require('mongoose')

const Schema = mongoose.Schema

const gradesSchema = new Schema({
    StudentID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    SubjectID: { 
        type: Schema.Types.ObjectId, 
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
        required: false,
        default: 0
    },
    score45Min: { 
        type: Number, 
        required: false,
        default: 0 
    },
    scoreAverage: { 
        type: Number, 
        required: false,
        default: 0
    },
});

gradesSchema.index({ StudentID: 1, SubjectID: 1 , term: 1}, { unique: true })

module.exports = mongoose.model('Grades', gradesSchema);
