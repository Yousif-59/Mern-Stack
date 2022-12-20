const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  //const workouts = await Workout.find({}).sort({createdAt: -1}) old code
  //res.status(200).json(workouts) old code
  req.query.avail = undefined ? Availbooks(): Availbooks(req.query.avail);
  
  async function Availbooks(avail){
    if(req.query.avail == undefined){
    const workout = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workout)
   }
    else{
      if(avail == "true"){
        const result = await Workout.find({avail:true})
        res.status(200).json(result)
      }
      else{
        const temp = await Workout.find({avail:false})
        res.status(200).json(temp)
      }
    }
  }
}

// get a single workout
const getWorkout = async (req, res) => {   //done

const { id } = req.params;
//const update = req.body 
const result = await Workout.findOne({id: req.params.id})
//const workout = await Workout.findById(id)
if (result == null)
res.status(404).send("not found")
else res.send(JSON.stringify(result))


}

// create a new workout
const createWorkout = async (req, res) => {
  const {id, title, author, publisher, isbn, avail, who, due, load, reps} = req.body

  // add to the database
  try {
    const workout = await Workout.create({ id, title,author, publisher, isbn, avail, who, due, load, reps })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => { //done
    const { id } = req.params

    const update = req.body 
    const bookToUpdate = await Workout.findOne({id: req.params.id})

    const book = await Workout.updateOne({id: req.params.id}, {$set:update})
    res.status(200).json(book)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}