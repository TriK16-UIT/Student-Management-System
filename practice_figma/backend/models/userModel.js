const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'teacher'],
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error('All fields must be filled!')
    }

    const user = await this.findOne({username})

    if (!user) {
        throw Error('Incorrect username!')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password!')
    }

    return user
}

userSchema.statics.signup = async function(username, password, firstName, lastName, email, role) {
    // validation
    if (!username || !password || !firstName || !lastName || !email || !role) {
        throw Error('All fields must be filled!')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid!')
    }
    if (!validator.isStrongPassword(password) && password !== 'admin') {
        throw Error('Password is not strong enough!')
    }

    const exists = await this.findOne({username})

    if (exists) {
        throw Error('Username already in use!')
    }

    const exists_email = await this.findOne({email})

    if (exists_email) {
        throw Error('Email already in use!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        username,
        password: hash,
        firstName,
        lastName,
        email,
        role
    })

    return user
}

module.exports = mongoose.model('User', userSchema)