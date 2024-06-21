const Subject = require('../models/subjectModel')
const ClassSubject = require('../models/classSubjectModel')
const Class = require('../models/classModel')
const Teacher = require('../models/teacherModel')
const mongoose = require('mongoose')

const createClassSubjects = async (ClassID) => {
    try {
        const subjects = await Subject.find()

        const classSubjectPromises = subjects.map(subject => {
            return new ClassSubject({
                ClassID: ClassID,
                SubjectID: subject._id
            }).save()
        })

        await Promise.all(classSubjectPromises)

        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const deleteClassSubjectsByClassID = async (ClassID) => {
    try {
        await ClassSubject.deleteMany({ ClassID: ClassID })
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const createClassSubjectsForNewSubject = async (SubjectID) => {
    try {
        const classes = await Class.find()

        if (!classes.length) {
            return { success: false, message: 'No classes found' };
        }

        const classSubjectPromises = classes.map(cls => {
            return new ClassSubject({
                ClassID: cls._id,
                SubjectID: SubjectID
            }).save();
        })
        await Promise.all(classSubjectPromises)
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const deleteClassSubjectsBySubjectID = async (SubjectID) => {
    try {
        await ClassSubject.deleteMany({ SubjectID: SubjectID })
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const updateClassSubject = async (req, res) => {
    const {id} = req.params
    const {ClassID, SubjectID, TeacherID} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such ClassSubject'})
    }

    if (ClassID || SubjectID) {
        return res.status(400).json({ error: 'Changing this is not allowed' })
    }

    if ('TeacherID' in req.body) {
        if (TeacherID === "") {
            const classsubject = await ClassSubject.findOneAndUpdate(
                { _id: id },
                { $unset: { TeacherID: "" } },
                { new: true }
            )

            return res.status(200).json(classsubject)
        } else {
            const teacherExists = await Teacher.findOne({ _id: TeacherID }).select('SubjectID -_id')

            if (!teacherExists) {
                return res.status(400).json({ error: 'No such teacher' })
            }
            
            const classSubjectID = await ClassSubject.findById(id).select('SubjectID -_id')

            if (!classSubjectID) {
                return res.status(400).json({ error: 'ClassSubject not found' })
            }

            if (teacherExists.toString() !== classSubjectID.toString()) {
                return res.status(400).json({ error: 'This teacher is not allowed to teach this subject!' })
            }
            
            const classsubject = await ClassSubject.findOneAndUpdate({ _id: id }, {
                ...req.body
            }, { new: true })

            return res.status(200).json(classsubject)
        }
    }
}

module.exports = {
    createClassSubjects,
    deleteClassSubjectsByClassID,
    createClassSubjectsForNewSubject,
    deleteClassSubjectsBySubjectID,
    updateClassSubject
}