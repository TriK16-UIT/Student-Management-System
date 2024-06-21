const Grades = require('../models/gradesModel')
const Student = require('../models/studentModel')
const Subject = require('../models/subjectModel')
const mongoose = require('mongoose')

const createGrades = async (StudentID) => {
    try {
        const subjects = await Subject.find()

        const terms = ["I", "II"]

        const gradePromises = subjects.flatMap(subject => 
            terms.map(term => 
                new Grades({
                    StudentID: StudentID,
                    SubjectID: subject._id,
                    term: term,
                    score15Min: 0,
                    score45Min: 0,
                    scoreAverage: 0
                }).save()
            )
        )

        await Promise.all(gradePromises)

        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const deleteGradesByStudentID = async (StudentID) => {
    try {
        await Grades.deleteMany({ StudentID: StudentID })
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const createGradesForNewSubject = async (SubjectID) => {
    try {
        const studentIDs = await Grades.distinct('StudentID')

        if (!studentIDs.length) {
            return { success: false, message: 'No students found' };
        }

        const terms = ["I", "II"]

        const gradePromises = studentIDs.flatMap(studentID =>
            terms.map(term =>
                new Grades({
                    StudentID: studentID,
                    SubjectID: SubjectID,
                    term: term,
                    score15Min: 0,
                    score45Min: 0,
                    scoreAverage: 0
                }).save()
            )
        );

        await Promise.all(gradePromises);

        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const deleteGradesBySubjectID = async (SubjectID) => {
    try {
        await Grades.deleteMany({ SubjectID: SubjectID })
        return { success: true }
    } catch (error) {
        return { success: false, error: error.message }
    }
}

const updateGrade = async (req, res) => {
    const {id} = req.params
    const {StudentID, SubjectID, Term, score15Min, score45Min, scoreAverage} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such grade'})
    }

    if (StudentID || SubjectID || Term || scoreAverage) {
        return res.status(400).json({ error: 'Changing this is not allowed' })
    }

    const grade = await Grades.findById(id)

    if (!grade) {
        return res.status(400).json({ error: 'No such grade' })
    }

    if (score15Min) {
        grade.score15Min = score15Min
    }

    if (score45Min) {
        grade.score45Min = score45Min
    }

    if (score15Min || score45Min) {
        grade.scoreAverage = (grade.score15Min * 1 + grade.score45Min * 2) / 3
    }

    await grade.save()
    
    res.status(200).json(grade)
}

const getGradebyStudentID = async (req, res) => {
    try {
        const StudentID = req.params.StudentID
        const grades = await Grades.find({ StudentID: StudentID }).populate('SubjectID')
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGradebyStudentIDTerm = async (req, res) => {
    try {
        const StudentID = req.params.StudentID
        const term = req.params.term
        const grades = await Grades.find({ StudentID: StudentID, term: term}).populate('SubjectID')
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGradebyStudentIDSubjectID = async (req, res) => {
    try {
        const StudentID = req.params.StudentID
        const SubjectID = req.params.SubjectID
        const grades = await Grades.find({ StudentID: StudentID, SubjectID: SubjectID }).populate('SubjectID')
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGradebyStudentIDSubjectIDTerm = async (req, res) => {
    try {
        const StudentID = req.params.StudentID
        const term = req.params.term
        const SubjectID = req.params.SubjectID
        const grades = await Grades.find({ StudentID: StudentID, term: term, SubjectID: SubjectID }).populate('SubjectID')
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGradebyClassIDSubjectIDTerm = async (req, res) => {
    try {
        const students = await Student.find({ ClassID: req.params.ClassID })
        const studentIDs = students.map(student => student._id)

        const grades = await Grades.find({
            StudentID: { $in: studentIDs },
            term: req.params.term,
            SubjectID: req.params.SubjectID,
        }).populate('SubjectID')
        res.status(200).json(grades)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getGrade = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such grade'})
    }

    const grade = await Grades.findById(id)
    return res.status(200).json(grade)
}

module.exports = {
    createGrades,
    createGradesForNewSubject,
    deleteGradesByStudentID,
    deleteGradesBySubjectID,
    updateGrade,
    getGrade,
    getGradebyStudentID,
    getGradebyStudentIDSubjectID,
    getGradebyStudentIDSubjectIDTerm,
    getGradebyStudentIDTerm,
    getGradebyClassIDSubjectIDTerm
}