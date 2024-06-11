const express = require('express')
const {
    loginUser,
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')
const checkOwnershipOrAdmin = require('../middleware/checkOwnershipOrAdmin')
const isAdmin = require('../middleware/isAdmin')

const router = express.Router()

router.post('/', requireAuth, isAdmin, createUser)
router.get('/', requireAuth, getUsers)
router.get('/:id', requireAuth, getUser)
router.patch('/:id', requireAuth, checkOwnershipOrAdmin, updateUser)
router.delete('/:id', requireAuth, isAdmin, deleteUser)
router.post('/login', loginUser)

module.exports = router