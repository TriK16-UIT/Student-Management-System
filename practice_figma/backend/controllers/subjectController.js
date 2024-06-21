const Subject = require('../models/subjectModel')
const Teacher = require('../models/teacherModel')
const mongoose = require('mongoose')
const {
    createClassSubjectsForNewSubject,
    deleteClassSubjectsBySubjectID
} = require('../controllers/classSubjectController')
const {
    createGradesForNewSubject,
    deleteGradesBySubjectID
} = require('../controllers/gradesController')

const subjects = [
    { name: 'Math' },
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Biology' },
    { name: 'History' },
    { name: 'Geography' },
    { name: 'Literature' },
    { name: 'Ethics' },
    { name: 'PE' }
];

const createSubjects = async () => {
    try {
        for (const subject of subjects) {
            const subjectExists = await Subject.findOne({ name: subject.name })
            if (!subjectExists) {
                await Subject.create({ name: subject.name })
                console.log(`Created subject: ${subject.name}`)
            } else {
                console.log(`Subject already exists: ${subject.name}`)
            }
        }
        console.log('Subjects check and initialization completed!')
    } catch (error) {
        console.error('Error initializing subjects: ', error.message)
    }
}

const createSubject = async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Please fill in all the fields!' })
    }

    try {
        const exists_subject = await Subject.findOne({ name: name })

        if (exists_subject) {
            throw Error('Name already in use!')
        }

        const subject = await Subject.create({ name: name })

        const result = await createClassSubjectsForNewSubject(subject._id);

        if (!result.success) {
            return res.status(400).json({ error: result.error });
        }

        const grade = await createGradesForNewSubject(subject._id);

        if (!grade.success) {
            return res.status(400).json({ error: grade.error });
        }

        res.status(200).json(subject)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteSubject = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such subject'})
    }

    const subject = await Subject.findByIdAndDelete({ _id: id })

    if (!subject) {
        return res.status(400).json({ error: 'No such subject' })
    }

    await Teacher.updateMany({ SubjectID: id }, { $unset: { SubjectID: "" } })

    const result = await deleteClassSubjectsBySubjectID(id);

    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }

    const grade = await deleteGradesBySubjectID(id);

    if (!grade.success) {
        return res.status(400).json({ error: grade.error });
    }

    return res.status(200).json(subject)
}

const updateSubject = async (req, res) => {
    const {id} = req.params
    const {name} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such subject'})
    }

    if (name) {
        const exists_subject = await Subject.findOne({ name: name })

        if (exists_subject) {
            return res.status(400).json({ error: 'Name already in use!' })
        }

        const subject = await Subject.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true })

        if (!subject) {
            return res.status(400).json({ error: 'No such subject' })
        }

        return res.status(200).json(subject)
    }
}

const getSubjects = async (req, res) => {
    const subjects = await Subject.find()
    res.status(200).json(subjects)
}

const getSubject = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such subject'})
    }

    const subject = await Subject.findById(id) 

    return res.status(200).json(subject)
}

module.exports = {
    createSubjects,
    createSubject,
    deleteSubject,
    getSubject,
    getSubjects,
    updateSubject
}