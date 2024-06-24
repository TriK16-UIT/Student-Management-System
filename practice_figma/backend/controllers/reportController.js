const Class = require('../models/classModel')
const Student = require('../models/studentModel')
const Grades = require('../models/gradesModel')
const Config = require('../models/configModel')

const getSubjectReport = async (req, res) => {
    const { SubjectID, term } = req.params

    try {
        const config = await Config.findOne()
        const passingGrade = config.passingGrade

        const classes = await Class.find()

        const reportData = await Promise.all(classes.map(async (cls) => {
            const students = await Student.find({ ClassID: cls._id })
            const studentIDs = students.map(student => student._id)

            const grades = await Grades.find({
                StudentID: { $in: studentIDs },
                term: term,
                SubjectID: SubjectID
            })

            const totalStudents = cls.numofStudents
            let passingStudents = 0

            grades.forEach(grade => {
                if (grade.scoreAverage >= passingGrade) {
                    passingStudents += 1
                }
            })

            const passRate = totalStudents > 0 ? (passingStudents / totalStudents) * 100 : 0

            return {
                className: `${cls.gradeLevel}${cls.name}`,
                totalStudents,
                passingStudents,
                passRate: passRate.toFixed(2)
            }
        }))

        res.status(200).json(reportData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getTermReport = async (req, res) => {
    const { term } = req.params

    try {
        const config = await Config.findOne()
        const passingGrade = config.passingGrade

        const classes = await Class.find()

        const reportData = await Promise.all(classes.map(async (cls) => {
            const students = await Student.find({ ClassID: cls._id })
            const studentIDs = students.map(student => student._id)

            const grades = await Grades.find({
                StudentID: { $in: studentIDs },
                term: term
            })

            const totalStudents = cls.numofStudents
            let passingStudents = 0

            students.forEach(student => {
                const studentGrades = grades.filter(grade => grade.StudentID.toString() === student._id.toString())
                const termAverage = studentGrades.reduce((acc, grade) => acc + grade.scoreAverage, 0) / studentGrades.length || 0

                if (termAverage >= passingGrade) {
                    passingStudents += 1
                }
            })

            const passRate = totalStudents > 0 ? (passingStudents / totalStudents) * 100 : 0

            return {
                className: `${cls.gradeLevel}${cls.name}`,
                totalStudents,
                passingStudents,
                passRate: passRate.toFixed(2)
            }
        }))

        res.status(200).json(reportData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllStudentsWithAverageScores = async (req, res) => {
    try {
        const students = await Student.find()

        const reportData = await Promise.all(students.map(async (student) => {
            const termIGrades = await Grades.find({
                StudentID: student._id,
                term: 'I'
            })

            const termIIGrades = await Grades.find({
                StudentID: student._id,
                term: 'II'
            })

            const calculateAverage = (grades) => {
                const totalScore = grades.reduce((acc, grade) => acc + grade.scoreAverage, 0)
                return grades.length > 0 ? (totalScore / grades.length) : 0
            }

            const termIAverage = calculateAverage(termIGrades)
            const termIIAverage = calculateAverage(termIIGrades)

            let classInfo = 'No Class';
            if (student.ClassID) {
                const classData = await Class.findById(student.ClassID);
                if (classData) {
                    classInfo = `${classData.gradeLevel}${classData.name}`;
                }
            }

            return {
                studentID: student._id,
                studentName: student.lastName + ' ' + student.firstName,
                className: classInfo,
                termIAverage: termIAverage.toFixed(2),
                termIIAverage: termIIAverage.toFixed(2)
            }
        }))

        res.status(200).json(reportData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getTermReport,
    getSubjectReport,
    getAllStudentsWithAverageScores
}