const express = require('express')

const {
    createSubject,
    deleteSubject,
    getSubject,
    getSubjects,
    updateSubject
} = require('../controllers/subjectController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin') 

const router = express.Router()

router.post('/', requireAuth, isAdmin, createSubject)
router.get('/', requireAuth, getSubjects)
router.get('/:id', requireAuth, getSubject)
router.patch('/:id', requireAuth, isAdmin, updateSubject)
router.delete('/:id', requireAuth, isAdmin, deleteSubject)

module.exports = router