const Student = require('../models/studentModel')
const Class = require('../models/classModel')
const Config = require('../models/configModel')
const validator = require('validator')
const mongoose = require('mongoose')
const { 
    createGrades,
    deleteGradesByStudentID
 } = require('../controllers/gradesController')

const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime()
    const age = new Date(diff).getUTCFullYear() - 1970
    return age
}

const createStudent = async (req, res) => {
    const {firstName, lastName, dateOfBirth, address, email, gender} = req.body

    let emptyFields = []

    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!dateOfBirth) {
        emptyFields.push('dateOfBirth')
    }
    if (!address) {
        emptyFields.push('address')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!gender) {
        emptyFields.push('gender')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields!', emptyFields })
    }

    try {
        // validation
        if (!validator.isEmail(email)) {
            throw Error('Email is not valid!')
        }

        const exists_email = await Student.findOne({ email: email })

        if (exists_email) {
            throw Error('Email already in use!')
        }

        const config = await Config.findOne()
        const age = calculateAge(dateOfBirth)
        if (age < config.minAge || age > config.maxAge) {
            throw Error(`Student age must be between ${config.minAge} and ${config.maxAge} years`)
        }

        const student = await Student.create({ firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, address: address, email: email, gender: gender})

        const result = await createGrades(student._id);

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        res.status(200).json(student)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteStudent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    const student = await Student.findByIdAndDelete({ _id: id})

    if (!student) {
        return res.status(400).json({ error: 'No such student' })
    }

    if (student.ClassID) {
        await Class.findByIdAndUpdate(student.ClassID, { $inc: { numofStudents: -1 } })
    }

    const result = await deleteGradesByStudentID(student._id)
    
    if (!result.success) {
        return res.status(400).json({ error: result.error })
    }

    return res.status(200).json(student)
}

const updateStudent = async (req, res) => {
    const {id} = req.params
    const config = await Config.findOne()

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    if ('dateOfBirth' in req.body) {
        const age = calculateAge(req.body.dateOfBirth)
        if (age < config.minAge || age > config.maxAge) {
            return res.status(400).json({ error: `Student age must be between ${config.minAge} and ${config.maxAge} years` })
        }
    }

    if ('email' in req.body) {
        const email = req.body.email
        if (!validator.isEmail( email )) {
            return res.status(400).json({ error: 'Email is not valid!' })
        }
        const exists_email = await Student.findOne({ email })
        if (exists_email) {
            return res.status(400).json({ error: 'Email already in use' })
        }
    }

    const student = await Student.findById(id)
    if (!student) {
        return res.status(400).json({error: 'No such student'})
    }

    const update = { ...req.body }

    if ('ClassID' in req.body) {
        if (req.body.ClassID === "") {
            if (student.ClassID) {
                await Class.findByIdAndUpdate(student.ClassID, { $inc: { numofStudents: -1 } });
                await Student.updateOne({ _id: id }, { $unset: {ClassID: "" } })
                delete update.ClassID
            }
        } else {
            const classExists = await Class.findById(req.body.ClassID);
            if (!classExists) {
                return res.status(400).json({ error: 'No such class' });
            }

            if (classExists.numofStudents >= config.maxClassSize) {
                return res.status(400).json({ error: 'Class is full' });
            }

            if (student.ClassID) {
                if (student.ClassID.toString() !== req.body.ClassID) {
                    await Class.findByIdAndUpdate(student.ClassID, { $inc: { numofStudents: -1 } });
                    await Class.findByIdAndUpdate(req.body.ClassID, { $inc: { numofStudents: 1 } });
                }
            } else {
                await Class.findByIdAndUpdate(req.body.ClassID, { $inc: { numofStudents: 1 } });
            }
        }
    }

    const updated_student = await Student.findOneAndUpdate({ _id: id },
        update
    , { new: true })

    return res.status(200).json(updated_student)
}

const getStudents = async (req, res) => {
    const students = await Student.find()

    res.status(200).json(students)
}

const getStudentsbyClassID = async (req, res) => {
    const ClassID = req.params.ClassID

    const students = await Student.find({ ClassID: ClassID })

    res.status(200).json(students)
}

const getStudentswithoutClassID = async (req, res) => {
    const students = await Student.find({ ClassID: { $exists: false } })

    res.status(200).json(students)
}

const getStudent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such student'})
    }

    const student = await Student.findById(id)

    return res.status(200).json(student)
}

module.exports = {
    createStudent,
    getStudent,
    getStudents,
    getStudentsbyClassID,
    getStudentswithoutClassID,
    updateStudent,
    deleteStudent
}