const express = require('express')
const {
    createTeacher,
    getTeacher,
    getTeachers,
    getTeacherbyUserID,
    updateTeacher,
    deleteTeacher,
<<<<<<< HEAD
    deleteTeacherbyUserID,
    getTeachersbySubjectID
=======
    getTeachersbySubjectID,
    deleteTeacherbyUserID,
>>>>>>> cda7a7b7e5b0c3d57c3ce3c7753a94959e1f3ef7
} = require('../controllers/teacherController')

const requireAuth = require('../middleware/requireAuth')
const checkOwnershipOrAdmin = require('../middleware/checkOwnershipOrAdmin')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', requireAuth, isAdmin, createTeacher)
router.get('/', requireAuth, getTeachers)
router.get('/:id', requireAuth, getTeacher)
router.get('/bySubject/:SubjectID', requireAuth, getTeachersbySubjectID)
router.get('/byUser/:UserID', requireAuth, getTeacherbyUserID)
router.patch('/:id', requireAuth, isAdmin, updateTeacher)
router.delete('/:id', requireAuth, isAdmin, deleteTeacher)
router.delete('/byUser/:UserID', requireAuth, isAdmin, deleteTeacherbyUserID)

module.exports = router