import express from "express";
const app=express();
import authRouter from "./routes/auth.js";
import dbConnect from "./config/db.js"
import expenseRouter from "./routes/expense.js";
import analyticsRouter from "./routes/analytics.js";
import dotenv from "dotenv"
// import cors from "cors";

dotenv.config();

// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// }));
app.use(express.json());



app.use("/api/auth",authRouter);
app.use("/api/expense",expenseRouter);
app.use("/api/analytics", analyticsRouter);


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