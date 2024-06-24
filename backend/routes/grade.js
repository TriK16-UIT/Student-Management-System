const express = require('express')

const {
    updateGrade,
    getGrade,
    getGradebyStudentID,
    getGradebyStudentIDSubjectID,
    getGradebyStudentIDSubjectIDTerm,
    getGradebyStudentIDTerm,
    getGradebyClassIDSubjectIDTerm
} = require('../controllers/gradesController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.patch('/:id', requireAuth, updateGrade)
router.get('/:id', requireAuth, getGrade)
router.get('/student/:StudentID', requireAuth, getGradebyStudentID)
router.get('/student/:StudentID/term/:term', requireAuth, getGradebyStudentIDTerm)
router.get('/student/:StudentID/subject/:SubjectID', requireAuth, getGradebyStudentIDSubjectID)
router.get('/student/:StudentID/subject/:SubjectID/term/:term', requireAuth, getGradebyStudentIDSubjectIDTerm)
router.get('/class/:ClassID/subject/:SubjectID/term/:term/', requireAuth, getGradebyClassIDSubjectIDTerm)

module.exports = router
