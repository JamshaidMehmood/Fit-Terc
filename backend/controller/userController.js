const User = require("../models/userSchema")
// json web token
const jwt=require("jsonwebtoken")

// creating own function in context of Json web token

const createToken=(_id)=>{
    return jwt.sign({_id: _id},process.env.JWTSECRET,{expiresIn:"1h"}) // 1h baically 60 min or 3600 seconds

}



const logInUser = async (req, res) => {
    const {email, password} = req.body
    //     console.log(password);
    try{
        const user=await User.logIn(email,password)

        // creating a token
        const token=createToken(user._id)

        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }



    //    res.json({message: "Login Successfully "})
}

const signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // User already exists, return an error response
            return res.status(400).json({ error: "User already exists" });
        }

        // User does not exist, proceed with creating a new user
        const user = await User.signUp(email, password);
        const token = createToken(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



module.exports = {
    logInUser,
    signInUser
}