const express = require('express')

const {
    getTermReport,
    getSubjectReport,
    getAllStudentsWithAverageScores
} = require('../controllers/reportController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/term/:term', requireAuth, getTermReport)
router.get('/term/:term/subject/:SubjectID', requireAuth, getSubjectReport)
router.get('/', requireAuth, getAllStudentsWithAverageScores)

module.exports = router