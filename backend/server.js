// fixing env which basically handel the environment variables for us
require('dotenv').config()

const express=require('express')
const mongoose=require("mongoose")

const workoutRoutes = require("./routes/workouts")
const userRoutes = require("./routes/users")


//making an instance of express 
const app=express()

// middleware
app.use(express.json()); // This middleware parses JSON in the request body
app.use((req, res, next) => {
    console.log(req.body);
    next();
});


// routes
// app.get('/', (req, res) => {
//     res.json({message:'Hello World'})
// })

app.use('/api/workouts/',workoutRoutes)

// using  users routes
app.use('/api/users/',userRoutes)

// connecting to database
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    
    // listening  process
    app.listen(process.env.PORT, () => {
    console.log('Server started at port ',process.env.PORT)
})

})
.catch((error)=>{
    console.log(error)
})

