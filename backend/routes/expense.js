import express from "express";
const expenseRouter=express.Router();
import { addExpenses, getExpenses,deleteExpense, updateExpense } from "../controllers/expenseController.js";
import { inputValidate } from "../middlewares/inputValidation.js";
import { verifyToken } from "../middlewares/authentication.js";
import { expenseSchema } from "../schemas/userExpenseSchema.js";




expenseRouter.post("/",verifyToken,inputValidate(expenseSchema), addExpenses);
expenseRouter.get("/",verifyToken,getExpenses);
expenseRouter.delete("/:id",verifyToken,deleteExpense);
expenseRouter.put("/:id",verifyToken,inputValidate(expenseSchema),updateExpense);

export default expenseRouter;