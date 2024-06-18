const express = require('express')

const {
    getTermReport,
    getSubjectReport
} = require('../controllers/reportController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/term/:term', requireAuth, getTermReport)
router.get('/term/:term/subject/:SubjectID', requireAuth, getSubjectReport)

module.exports = router