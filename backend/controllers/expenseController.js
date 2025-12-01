import mongoose from "mongoose";
import {expenseModel} from "../models/expenseModel.js";

export const addExpenses = async (req, res) => {
    try {
        const { title, amount, category, date, notes } = req.body;

        const newExpense = await expenseModel.create({
            userId: new mongoose.Types.ObjectId(req.user.id),
            title,
            amount,
            category,
            date: date ? new Date(date) : new Date(),
            notes
        });

        res.status(201).json({
            message: "Expense added successfully",
            expense: newExpense
        });

    } catch (err) {
        console.error("Add Expense Error:", err);
        res.status(500).json({ message: "Server error while adding expense" });
    }
};


export const getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({ expenses });

    } catch (err) {
        console.error("Get Expense Error:", err);
        res.status(500).json({ message: "Server error while fetching expenses" });
    }
};


export const updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        // check if expense belongs to logged in user
        const updatedExpense = await expenseModel.findOneAndUpdate(
            { _id: expenseId, userId: req.user.id },
            req.body,
            { new: true } // returns updated document
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }

        return res.status(200).json({
            message: "Expense updated successfully",
            expense: updatedExpense
        });

    } catch (err) {
        console.error("Update Expense Error:", err);
        return res.status(500).json({ message: "Server error while updating expense" });
    }
};


export const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const deleted = await expenseModel.findOneAndDelete({
            _id: expenseId,
            userId: req.user.id
        });

        if (!deleted) {
            return res.status(404).json({
                message: "Expense not found or unauthorized"
            });
        }

        return res.status(200).json({
            message: "Expense deleted successfully"
        });

    } catch (err) {
        console.error("Delete Expense Error:", err);
        return res.status(500).json({ message: "Server error while deleting expense" });
    }
};
