const Teacher = require('../models/teacherModel')
const Subject = require('../models/subjectModel')
const User = require('../models/userModel')

const createTeacher = async (req, res) => {
    const { username, password, firstName, lastName, email, role, subjectName } = req.body
    
    if (role !== 'teacher') {
        return res.status(400).json({ error: 'Role must be "teacher" for this endpoint.' });
    }

    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!role) {
        emptyFields.push('role')
    }
    if (!subjectName) {
        emptyFields.push('subjectName')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields!', emptyFields })
    }

    try {
        const subject = await Subject.findOne({ name: subjectName })
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found'})
        }

        const user = await User.signup(username, password, firstName, lastName, email, role)
        
        const teacher = await Teacher.create({ UserID: user._id, SubjectID: subject._id })
        res.status(200).json(teacher)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getTeachers = async (req, res) => {
    const teachers = await Teacher.find()
            .populate({ path: 'UserID', select: '-password' })
            .populate('SubjectID')

    // const teachers = await Teacher.find()

    // const teacherPromises = teachers.map(async (teacher) => {
    //     const user = await User.findOne({ UserID: teacher.UserID }).select('-password')
    //     const subject = await Subject.findOne({ SubjectID: teacher.SubjectID })

    //     return {
    //         ...teacher._doc,
    //         user,
    //         subject
    //     }
    // })  
    // const populatedTeachers = await Promise.all(teacherPromises)
    res.status(200).json(teachers)
}

const getTeacher = async (req, res) => {
    const {id} = req.params

    const teacher = await Teacher.findOne({ _id: id }).populate({ path: 'UserID', select: '-password' }).populate('SubjectID')

    // const teacher = await Teacher.findOne({ UserID: UserID })
    // if (!teacher) {
    //     return res.status(404).json({ error: 'No such teacher' })
    // }

    // const user = await User.findOne({ UserID: teacher.UserID }).select('-password')
    // const subject = await Subject.findOne({ SubjectID: teacher.SubjectID })

    // const populatedTeacher = {
    //     ...teacher._doc,
    //     user,
    //     subject
    // }
    return res.status(200).json(teacher)
}

const updateTeacher = async (req, res) => {
    const {id} = req.params

    const subjectExists = await Subject.exists({ _id: req.body.SubjectID})
    if (!subjectExists) {
        return res.status(400).json({ error: 'No such subject'})
    }

    if ('UserID' in req.body) {
        return res.status(400).json({ error: 'Changing this is not allowed' })
    }

    const teacher = await Teacher.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true })

    if (!teacher) {
        return res.status(400).json({error: 'No such teacher'})
    }
    return res.status(200).json(teacher)
}

const deleteTeacher = async (req, res) => {
    const {id} = req.params
    const teacher = await Teacher.findByIdAndDelete({ _id: id }).select('UserID')
    if (!teacher) {
        return res.status(400).json({error: 'No such teacher'})
    }
    const user = await User.findByIdAndDelete({ _id: teacher.UserID})
    return res.status(200).json(teacher)
}

module.exports = {
    createTeacher,
    getTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher
}
