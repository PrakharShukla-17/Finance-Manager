import express from "express";
const app=express();
import authRouter from "./routes/auth.js";
import dbConnect from "./config/db.js"
import expenseRouter from "./routes/expense.js";
import analyticsRouter from "./routes/analytics.js";
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

const corsOptions = {
  origin: 'finance-manager-chi-inky.vercel.app', // PUT YOUR VERCEL FRONTEND URL HERE
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true // Allow cookies/sessions (Critical if you use cookies for login)
};

app.use(cors(corsOptions));
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