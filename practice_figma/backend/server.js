require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const teacherRoutes = require('./routes/teacher')
const classRouters = require('./routes/class')
const cors = require('cors')

const { createSubjects } = require('./controllers/subjectController')
const { initializeAdmin } = require('./controllers/userController')

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
app.use('/api/teacher', teacherRoutes)
app.use('/api/user', userRoutes)
app.use('/api/class', classRouters)

//Connect to DB
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        console.log('Database connected!')

        // Initialize subjects
        createSubjects()
        // Initialize admin
        initializeAdmin()

        //Listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })