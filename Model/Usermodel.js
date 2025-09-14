import mongoose from "mongoose";

const data = new mongoose.Schema({
    username:{
        type:String,
      
        required: [true, "Username is required"],
        trim: true,
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email:{
        type:String,
         required: [true, "Email is required"],
         unique: true,
        // match: [/^[a-zA-Z0-9]+@gmail\.com$/, "Email must end with @gmail.com"]
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    }

})
const usermodel= mongoose.model("user",data,"TodoUserlist")
export default usermodel