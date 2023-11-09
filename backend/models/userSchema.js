const mongoose=require("mongoose")
const Schema=mongoose.Schema
const bcrypt=require("bcrypt")
const validator=require("validator")


const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// for static sign up method in order for the security reason to encrypt the password

userSchema.statics.signUp= async (email , password) => {

    // validating the email and password using validator module 
    
    if(! email || ! password){
        throw Error("Email and password must not be empty")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong")
    }

    // basically declaring the model because this.findOne( ) has not worked
    const UserModel = mongoose.model("User");

    const alreadyExsist = await UserModel.findOne({email});
    if(alreadyExsist){
        throw Error("Email already exsist")
    }

    // using bcrypt module to encrypt the password 
    // IT TAKES  ROUND VALUE AS ARGUMENT WITH IS BBETTER TO  take 10  
    // if you increase the value this means complex encryption take place

    const saltValue= await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password , saltValue)

    // now creating the user 
    const user= await UserModel.create({email , password:hash})

    return user

}

// for static login  method 

userSchema.statics.logIn= async (email , password) => {

    // validating the email and password using validator module 
    
    if(! email || ! password){
        throw Error("Email and password must not be empty")
    }

    // basically declaring the model because this.findOne( ) has not worked
    const UserModel = mongoose.model("User");

    const user = await UserModel.findOne({email});
    if(! user){
        throw Error("Incorrect Email")
    }

    const match= await bcrypt.compare(password , user.password)
    if(! match)
    {
        throw Error("Incorrect Password")
    }

    return user

    


}

module.exports=mongoose.model("User",userSchema)