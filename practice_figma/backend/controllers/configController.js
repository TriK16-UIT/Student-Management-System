const Config = require('../models/configModel')
const Class = require('../models/classModel')
const Student = require('../models/studentModel')

const calculateAge = (dob) => {
    const diff = Date.now() - new Date(dob).getTime()
    const age = new Date(diff).getUTCFullYear() - 1970
    return age
}

const initializeConfig = async () => {
    const configExists = await Config.findOne()
    if (!configExists) {
        const defaultConfig = new Config({
            minAge: 15,
            maxAge: 20,
            maxClassSize: 40,
            passingGrade: 5
        })
        await defaultConfig.save()
        console.log('Config created!')
    } else {
        console.log('Config already exists')
    }
}

const updateConfig = async (req, res) => {
    const config = await Config.findOne()
    const { minAge, maxAge, maxClassSize, passingGrade } = req.body

    const youngestStudent = await Student.find().sort({ dateOfBirth: -1 }).limit(1)
    const oldestStudent = await Student.find().sort({ dateOfBirth: 1 }).limit(1)

    const youngestAge = youngestStudent[0] ? calculateAge(youngestStudent[0].dateOfBirth) : null
    const oldestAge = oldestStudent[0] ? calculateAge(oldestStudent[0].dateOfBirth) : null

    if (minAge && maxAge) {
        if (minAge >= maxAge) {
            return res.status(400).json({ error: 'minAge is higher than maxAge'})
        }
        if (minAge > youngestAge) {
            return res.status(400).json({ error: `minAge must be less than or equal to the youngest student's age (${youngestAge})`})
        }
        if (maxAge < oldestAge) {
            return res.status(400).json({ error: `maxAge must be greater than or equal to the oldest student's age (${oldestAge})`})
        }
    } else if (minAge) {
        if (minAge >= config.maxAge) {
            return res.status(400).json({ error: 'minAge is higher than maxAge'})
        }
        if (minAge > youngestAge) {
            return res.status(400).json({ error: `minAge must be less than or equal to the youngest student's age (${youngestAge})`})
        }
    } else if (maxAge) {
        if (config.minAge >= maxAge) {
            return res.status(400).json({ error: 'minAge is higher than maxAge'})
        }
        if (maxAge < oldestAge) {
            return res.status(400).json({ error: `maxAge must be greater than or equal to the oldest student's age (${oldestAge})`})
        }
    }
    if (passingGrade) {
        if (passingGrade < 1 || passingGrade > 10) {
            return res.status(400).json({ error: 'passingGrade must be between 1 and 10' })
        }
    }

    if (maxClassSize) {
        const classes = await Class.find().sort({ numofStudents: 1 }).limit(1)
        const lowestClassSize = classes[0] ? classes[0].numofStudents : 0

        if (maxClassSize < lowestClassSize) {
            return res.status(400).json({ error: `maxClassSize must be greater than or equal to the number of students in the smallest class (${lowestClassSize})` });
        }
    }

    const update_config = await Config.findOneAndUpdate({}, {
        ...req.body
    }, { new: true })
    return res.status(200).json(update_config)
}

const getConfig = async(req, res) => {
    const config = await Config.findOne()

    res.status(200).json(config)
}

module.exports = {
    updateConfig,
    initializeConfig,
    getConfig
}