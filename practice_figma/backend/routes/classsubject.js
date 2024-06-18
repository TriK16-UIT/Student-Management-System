const express = require('express')

const {
    updateClassSubject
} = require('../controllers/classSubjectController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.patch('/:id', requireAuth, isAdmin, updateClassSubject)

module.exports = router