const Class = require('../models/classModel')
const Student = require('../models/studentModel')
const ClassSubject = require('../models/classSubjectModel')
const mongoose = require('mongoose')
const {
    createClassSubjects,
    deleteClassSubjectsByClassID
} = require('../controllers/classSubjectController')

const createClass = async (req, res) => {
    const {name, gradeLevel} = req.body

    let emptyFields = [] 

    if (!name) {
        emptyFields.push('name')
    }
    if (!gradeLevel) {
        emptyFields.push('gradeLevel')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try {
        if (!/^[A-Z]\d{1,2}$/.test(name)) {
            throw Error('Class name must match the pattern /^[A-Z]\\d{1,2}$/ (e.g., A1, B12).');
        }

        // Validate the grade level
        if (![10, 11, 12].includes(parseInt(gradeLevel, 10))) { // Ensure gradeLevel is an integer
            throw Error('Grade level must be one of 10, 11, 12.');
        }

        // Create the new class
        const new_class = await Class.create({ name: name, gradeLevel: parseInt(gradeLevel, 10) });

        // Create related class subjects
        const classsubject = await createClassSubjects(new_class._id);

        if (!classsubject.success) {
            return res.status(400).json({ error: classsubject.error });
        }

        res.status(200).json(new_class);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteClass = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    const deleted_class = await Class.findByIdAndDelete({ _id: id})

    if (!deleted_class) {
        return res.status(400).json({ error: 'No such class' })
    }

    await Student.updateMany({ ClassID: id }, { $unset: { ClassID: "" } })

    const classsubject = await deleteClassSubjectsByClassID(id)

    if (!classsubject.success) {
        return res.status(400).json({ error: classsubject.error })
    }

    return res.status(200).json(deleted_class)
}

const updateClass = async (req, res) => {
    const {id} = req.params
    const {name, gradeLevel, numofStudents} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    if (name) {
        if (!/^[A-Z]\d{1,2}$/.test(name)) {
            return res.status(400).json({ error: 'Class name must match the pattern /^[A-Z]\\d{1,2}$/ (e.g., A1, B12).' });
        }
    }
    
    if (gradeLevel) {
        if (![10, 11, 12].includes(gradeLevel)) {
            return res.status(400).json({ error: 'gradeLevel must be one of 10, 11, 12.' });
        }
    }

    if (numofStudents) {
        return res.status(400).json({ error: 'Changing this is not allowed' })
    }

    const update_class = Class.findById(id)

    if (!update_class) {
        return res.status(400).json({ error: 'No such class' })
    }

    if (name && gradeLevel) {
        const classExists = await Class.exists({ name, gradeLevel })
        if (classExists) {
            return res.status(400).json({ error: 'Class with this name and grade level exists' })
        }
    } else if (name) {
        const exist_gradeLevel = update_class.gradeLevel
        const classExists = await Class.exists({ name, exist_gradeLevel })
        if (classExists) {
            return res.status(400).json({ error: 'Class with this name and grade level exists' })
        }
    } else if (gradeLevel) {
        const exist_name = update_class.name
        const classExists = await Class.exists({ exist_name, gradeLevel })
        if (classExists) {
            return res.status(400).json({ error: 'Class with this name and grade level exists' })
        }
    }

    const updated_class = await Class.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    res.status(200).json(updated_class)
}

const getClasses = async (req, res) => {
    const classes = await Class.find()

    res.status(200).json(classes)
}

const getClass = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such class'})
    }

    const get_class = await Class.findOne({ _id: id })
    return res.status(200).json(get_class)
}

const getClassesByTeacherID = async (req, res) => {
    const TeacherID = req.params.TeacherID

    const classsubjects = await ClassSubject.find({ TeacherID: TeacherID }).select('ClassID -_id')
 
    if (!classsubjects.length) {
        return res.status(404).json({ error: 'No classes found for this teacher' })
    }

    const classIDs = classsubjects.map(cs => cs.ClassID)

    const classes = await Class.find({ _id: { $in: classIDs } })

    res.status(200).json(classes)
}

module.exports = {
    createClass,
    getClass,
    getClasses,
    updateClass,
    deleteClass,
    getClassesByTeacherID
}