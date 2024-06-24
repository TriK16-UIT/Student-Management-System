const express = require('express')
const {
    createTeacher,
    getTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
    getTeachersbySubjectID,
    deleteTeacherbyUserID,
} = require('../controllers/teacherController')

const requireAuth = require('../middleware/requireAuth')
const checkOwnershipOrAdmin = require('../middleware/checkOwnershipOrAdmin')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', requireAuth, isAdmin, createTeacher)
router.get('/', requireAuth, getTeachers)
router.get('/:id', requireAuth, getTeacher)
router.get('/bySubject/:SubjectID', requireAuth, getTeachersbySubjectID)
router.patch('/:id', requireAuth, isAdmin, updateTeacher)
router.delete('/:id', requireAuth, isAdmin, deleteTeacher)
router.delete('/byUser/:UserID', requireAuth, isAdmin, deleteTeacherbyUserID)

module.exports = router