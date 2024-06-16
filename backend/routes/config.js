const express = require('express')

const {
    updateConfig,
    getConfig
} = require('../controllers/configController')

const requireAuth = require('../middleware/requireAuth')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.get('/', requireAuth, getConfig)
router.patch('/', requireAuth, isAdmin, updateConfig)

module.exports = router