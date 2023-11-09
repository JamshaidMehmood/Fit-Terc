const Workout = require("../models/workoutSchema")
const mongoose = require("mongoose")

// get all workouts
const getAllWorkouts = async (req, res) => {
    // for user specific workouts entries
    // const user_id = req.user._id
    const user_id = req.user._id.toString();

    try {
        const workouts = await Workout.find({user_id}).sort({ createdAt: -1 })
        if (workouts) {
            res.status(200).json(workouts)
        }
        else {
            return res.status(404).json({ message: "No Workout available right now" })
        }

    }
    catch (error) {
        return res.status(404).json({ message: error.body })
    }
}

// get a single workout
const getASingleWorkout = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const workouts = await Workout.findById(id)
            if (workouts) {
                res.status(200).json(workouts)
            }
            else {
                return res.status(404).json({ message: "No Workout available right now" })
            }

        }
        catch (error) {
            return res.status(404).json({ message: error.body })
        }
    }
    else {
        return res.status(404).json({ message: "Invalid Id" })
    }
}


//to create a  single workout
const createWorkout = async (req, res) => {
    
    const { title, load, reps } = req.body
    const emptyFields = []
    
    if (! title) {
        emptyFields.push('title')
    }
    if (! load) {
        emptyFields.push('load')
    }
    if (! reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ emptyFields ,error: "Fill ALL Fields" })
    }

    else {
        try {
            // console.log('///////')
            // const user_id = req.user._id
            const user_id = req.user._id.toString();
            
            console.log(user_id)
            const workout = await Workout.create({ title, load, reps,user_id})
            res.status(200).json(workout)
        }
        catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

// delete a workout
const deleteAWorkout = async (req, res) => {
    const { id } = req.params
    
    // console.log("------------------------")
    // console.log(id)
    // console.log("------------------------")

    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const result = await Workout.findByIdAndDelete({ _id: id })
            if (result) {
                res.status(200).json({ result, message: "Workout deleted successfully" })
            }
            else {
                return res.status(404).json({ message: "No workout found" })
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        return res.status(404).json({ message: "Invalid Id" })
    }
}
// update a workout
const updateAWorkout = async (req, res) => {
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        try {
            const result = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body })
            if (result) {
                res.status(200).json({ result, message: "Workout Updated successfully" })
            }
            else {
                return res.status(404).json({ message: "No workout found" })
            }
        }
        catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    else {
        return res.status(404).json({ message: "Invalid Id" })
    }
}




module.exports = {
    createWorkout,
    getAllWorkouts,
    getASingleWorkout,
    deleteAWorkout,
    updateAWorkout
}