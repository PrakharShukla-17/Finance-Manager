import express from "express";
const app=express();
import authRouter from "./routes/auth.js";
import dbConnect from "./config/db.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();

app.use(express.json());


app.use("/api/auth",authRouter);

app.get("/",(req,res)=>{
    res.send("Up and running");
})



async function main() {
   dbConnect();
   app.listen(3000,()=>{
    console.log("server up and running");
});
}

main();