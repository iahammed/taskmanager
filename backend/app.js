const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Welcome API go to /task for task data')
})

// CRUD ROUTE-CONTROLL for TASKS
const taskRouter = require('./route/tasks')
app.use('/task', taskRouter)

//connect to MongoDB 
require('dotenv/config')
mongoose.connect(
    process.env.DB_CONNECTION,
    // { useUnifiedTopology: true },
    { useNewUrlParser:true },
    () => { console.log('Connected to DB') }
)

// Constants
const PORT = process.env.PORT

app.listen(PORT)
// console.log(`Running on http://${HOST}:${PORT}`)