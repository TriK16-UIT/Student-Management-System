const express = require('express')

const {
    createClass,
    getClass,
    getClasses,
    updateClass,
    deleteClass,
    getClassesByTeacherID
} = require('../controllers/classController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', requireAuth, isAdmin, createClass)
router.get('/', requireAuth, getClasses)
router.get('/:id', requireAuth, getClass)
router.get('/byTeacher/:TeacherID', requireAuth, getClassesByTeacherID)
router.patch('/:id', requireAuth, isAdmin, updateClass)
router.delete('/:id', requireAuth, isAdmin, deleteClass)

module.exports = router