const express=require('express')
const { createWorkout, 
        getAllWorkouts,
        getASingleWorkout,
        deleteAWorkout,
        updateAWorkout}
        = require("../controller/workoutController")

const reqAuth=require("../middleware/requireAuth")


const router=express.Router()

// for making secure our workout routs show after verification purposes
router.use(reqAuth)

// api to get all workouts
router.get('/', getAllWorkouts)

// api to get a single workouts
router.get('/:id', getASingleWorkout)

//post a new request
router.post('/', createWorkout)

//delete workout
router.delete('/:id', deleteAWorkout)

//update workout
router.patch('/:id', updateAWorkout)

module.exports=router