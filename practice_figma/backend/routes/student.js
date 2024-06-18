const express = require('express')

const {
    createStudent,
    getStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    getStudentsbyClassID,
    getStudentswithoutClassID
} = require('../controllers/studentController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', requireAuth, isAdmin, createStudent)
router.get('/', requireAuth, getStudents)
router.get('/withoutClass', requireAuth, getStudentswithoutClassID)
router.get('/:id', requireAuth, getStudent)
router.get('/byClass/:ClassID', requireAuth, getStudentsbyClassID)
router.patch('/:id', requireAuth, isAdmin, updateStudent)
router.delete('/:id', requireAuth, isAdmin, deleteStudent)

module.exports = router