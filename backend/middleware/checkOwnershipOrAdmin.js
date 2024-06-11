const Teacher = require('../models/teacherModel')

const checkOwnershipOrAdmin = async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id).select('UserID')
    const teacher_id = teacher ? teacher.UserID : "nothing"
    if (req.user && (req.user.role === 'admin' || req.user._id.toString() === req.params.id.toString() || req.user._id.toString() === teacher_id.toString())) {
        next()
    } else {
        res.status(403).json({ message: 'Access denied' })
    }
}

module.exports = checkOwnershipOrAdmin