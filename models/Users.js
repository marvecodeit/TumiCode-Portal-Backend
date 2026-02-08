import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    joinedAt: {
        type:Date,
        default:Date.now,
    },
    image: {
        type:String,
        required:false
    },
     role: { type: String, enum: ["user", "admin"], default: "user" }, // <-- role
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;