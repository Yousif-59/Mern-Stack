require('dotenv').config()
const express = require('express');
const workoutRoutes = require('./routes/workouts');
const app = express();
const mongoose = require('mongoose');
app.use(express.json())

app.use((req,res,next) => { //middleware
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts' , workoutRoutes) // grabs all different routes and use them in this file

//connect to db, async take time
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to DB and listening on port', process.env.PORT)
        })
    })
    .catch ((error) => {
        console.log(error)
    })



