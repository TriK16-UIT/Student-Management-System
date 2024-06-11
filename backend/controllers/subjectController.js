const Subject = require('../models/subjectModel')

const subjects = [
    { name: 'Math' },
    { name: 'Physics' },
    { name: 'Chemistry' },
    { name: 'Biology' },
    { name: 'History' },
    { name: 'Geography' },
    { name: 'Literature' },
    { name: 'Ethics' },
    { name: 'PE' }
];

const createSubjects = async () => {
    try {
        for (const subject of subjects) {
            const subjectExists = await Subject.findOne({ name: subject.name })
            if (!subjectExists) {
                await Subject.create({ name: subject.name })
                console.log(`Created subject: ${subject.name}`)
            } else {
                console.log(`Subject already exists: ${subject.name}`)
            }
        }
        console.log('Subjects check and initialization completed!')
    } catch (error) {
        console.error('Error initializing subjects: ', error.message)
    }
}

module.exports = {
    createSubjects
}