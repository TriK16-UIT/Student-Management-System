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


module.exports = {
    getTermReport,
    getSubjectReport
}