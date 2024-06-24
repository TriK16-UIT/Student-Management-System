const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)

        //create a token
        const token = createToken(user._id)

        const role = user.role

        res.status(200).json({username, token, role})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const createUser = async (req, res) => {
    const {username, password, firstName, lastName, email, role} = req.body

    // Prevent creating a user with role 'teacher' directly
    if (role === 'teacher') {
        return res.status(400).json({ error: 'Use the createTeacher endpoint to create a teacher with a subject'})
    }
    
    let emptyFields = []

    if (!username) {
        emptyFields.push('username')
    }
    if (!password) {
        emptyFields.push('password')
    }
    if (!firstName) {
        emptyFields.push('firstName')
    }
    if (!lastName) {
        emptyFields.push('lastName')
    }
    if (!email) {
        emptyFields.push('email')
    }
    if (!role) {
        emptyFields.push('role')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields!', emptyFields })
    }
    try {
        const user = await User.signup(username, password, firstName, lastName, email, role)

        res.status(200).json({ message: 'User created sucessfully!' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const initializeAdmin = async () => {
    try {
        const username = 'admin'
        const password = 'admin'
        const firstName = 'admin'
        const lastName = 'admin'
        const email = 'cyk4chuu@gmail.com'
        const role = 'admin'

        const existingAdmin = await User.findOne({ username: username })

        if (!existingAdmin) {
            const user = await User.signup(username, password, firstName, lastName, email, role)
            console.log(`Admin account created!`)
        }
        else {
            console.log('Admin account already exists')
        }
    } catch (error) {
        console.error('Error initializing admin account: ', error.message)
    }
}

const getUsers = async (req, res) => {
    const user_id = req.user._id

    const users = await User.find({ _id: { $ne: user_id } }, '-password')
    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const user = await User.findOne({ _id: id }, '-password')

    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    return res.status(200).json(user)
}

const updateUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    // Check if the 'role' property is in the request body
    if ('role' in req.body || 'username' in req.body || 'email' in req.body || 'UserID' in req.body) {
        return res.status(400).json({ error: 'Changing this is not allowed' })
    }

    const user = await User.findOneAndUpdate({ _id: id }, {
        ...req.body
    }, { new: true }).select('-password')

    if (!user) {
        return res.status(400).json({error: 'No such user'})
    }
    return res.status(200).json(user)
}

const deleteUser = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such user'})
    }

    const check_role = await User.findById(id)

    if (!check_role) {
        return res.status(400).json({error: 'No such user'})
    }

    if (check_role.role === 'teacher') {
        return res.status(400).json({ error: 'Use the deleteTeacher endpoint'})
    }

    const user = await User.findOneAndDelete({ _id:id })

    return res.status(200).json(user)
}

module.exports = {
    loginUser,
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    initializeAdmin
}