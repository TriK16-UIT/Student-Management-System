const mongoose = require('mongoose')

const Schema = mongoose.Schema

const classSchema = new Schema({
    numofStudents: { 
        type: Number, 
        default: 0 
    },
    name: { 
        type: String, 
        required: true,
        match: /^[A-Z]\d{1,2}$/
    },
    gradeLevel: { 
        type: Number,
        enum: [10, 11, 12], 
        required: true 
    },
})

classSchema.index({ name: 1, gradeLevel: 1 }, { unique: true });

module.exports = mongoose.model('Class', classSchema)
