const express=require('express')
const { logInUser , signInUser} = require("../controller/userController")



const router=express.Router()

router.post('/login', logInUser)
router.post('/signup', signInUser)

module.exports=router