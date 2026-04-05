import { Schema, model } from "mongoose";


const userSchema = new Schema({
    firstName : {
        type : String ,
        required : true ,
        maxlength: 30,
        minlength : 4
    },
    lastName : {
        type : String ,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true ,
        lowercase: true,
        trim: true ,
        match : [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true ,
        select: false ,
        minlength: 6 ,
    } , 
    role: {
        type: String,
        enum : ["viewer", "analyst","admin"],
        default: "viewer",
        select : "false",
    } , 
    status : {
        type : String,
        enum : ["active", "inactive"],
        default: "active",
        select : "false",
    }
}, {timestamps: true });

const User = model("User", userSchema);


export default User;