import mongoose from "mongoose";
const Schema=mongoose.Schema;

const User=new Schema({
    userEmail:{type:String,unique:true},
    userPassword:String,
    userFirstname:String,
    userLastname:String
    },
    {timestamps:true}
)


export const userModel=mongoose.model('users',User);

