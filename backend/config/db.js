import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

async function dbConnect(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connected");
    }catch(error){
        console.error(" DB connection failed ",error.message);
        process.exit(1);
    }
}

export default dbConnect;