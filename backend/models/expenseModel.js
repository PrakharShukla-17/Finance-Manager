import mongoose from "mongoose";
const Schema=mongoose.Schema;



const Expense=new Schema({
    userId:{type:mongoose.Types.ObjectId,ref:"users",required:true},
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    category:{type:String,required:true},
    date:{type:Date,default:Date.now},
    notes:{type:String},
},{timestamps:true});


const expenseModel=mongoose.model("Expense",Expense);

export {expenseModel};