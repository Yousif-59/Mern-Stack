const mongoose = require('mongoose');

const Schema = mongoose.Schema

const workoutSchema = new Schema({
    id: {
        type: Number,
        //required: true
    },
    title: {
        type: String,
        //required: true
    },
    author: {
        type: String
    },
    publisher: {
        type: String
    },
    isbn: {
        type: String
    },
    avail: {
        type: String
    },
    who: {
        type: String
    },
    due: {
        type: String
    },
     reps: {
        type: Number,
        //required: true
    },
    load: {
        type: Number,
        //required: true
    }
}, {timeestamps: true})

module.exports = mongoose.model('Workout', workoutSchema )
