const Class = require('../models/classModel')
const Student = require('../models/studentModel')

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
        const new_class = await Class.create({ name: name, gradeLevel: gradeLevel })
        res.status(200).json(new_class)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteClass = async (req, res) => {
    const {id} = req.params

    const deleted_class = await Class.findByIdAndDelete({ _id: id})

    if (!deleted_class) {
        return res.status(400).json({ error: 'No such class' })
    }
    return res.status(200).json(deleteClass)
}

const updateClass = async (req, res) => {
    const {id} = req.params

    const updated_class = await Class.findById(id)

    if (!updated_class) {
        return res.status(400).json({error: 'No such class'})
    }

    // Count the current number of students in the class
    const currentStudentCount = await Student.countDocuments({ ClassID: id })

    if (req.body.numofStudents < currentStudentCount) {
        return res.status(400).json({ error: `New maxStudents value must be higher than or equal to the current number of students (${currentStudentCount})` })
    }

    updated_class.numofStudents = req.body.numofStudents
    await updated_class.save()

    res.status(200).json(updated_class)
}

const getClasses = async (req, res) => {
    const classes = await Class.find()

    res.status(200).json(classes)
}

const getClass = async (req, res) => {
    const {id} = req.params

    const get_class = await Class.findOne({ _id: id })
    return res.status(200).json(get_class)
}

module.exports = {
    createClass,
    getClass,
    getClasses,
    updateClass,
    deleteClass
}