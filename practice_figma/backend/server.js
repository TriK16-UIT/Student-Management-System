require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const teacherRoutes = require('./routes/teacher')
const classRouters = require('./routes/class')
const studentRouters = require('./routes/student')
const configRouters = require('./routes/config')
const subjectRouters = require('./routes/subject')
const classsubjectRouters = require('./routes/classsubject')
const gradeRouters = require('./routes/grade')
const reportRouters = require('./routes/report')
const cors = require('cors')

const { createSubjects } = require('./controllers/subjectController')
const { initializeAdmin } = require('./controllers/userController')
const { initializeConfig } = require('./controllers/configController')

//Init express app
const app = express()

//Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000', // replace with your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.use((req,res,next) => {
//    console.log(req.path,req.method);
//    next()
//})

//Temporary before bulding routes
// app.get('/', (req, res) =>{
//     res.json({mssg: 'Welcome to the app'})
// })

app.use('/api/user', userRoutes)
app.use('/api/teacher', teacherRoutes)
app.use('/api/class', classRouters)
app.use('/api/student', studentRouters)
app.use('/api/config', configRouters)
app.use('/api/subject', subjectRouters)
app.use('/api/classsubject', classsubjectRouters)
app.use('/api/grade', gradeRouters)
app.use('/api/report', reportRouters)

//Connect to DB
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        console.log('Database connected!')

        // Initialize subjects
        createSubjects()
        // Initialize admin
        initializeAdmin()
        // Intiialize config
        initializeConfig()

        //Listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })