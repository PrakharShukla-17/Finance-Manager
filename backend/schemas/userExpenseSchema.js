import {z} from "zod";

export const expenseSchema=z.object({
  title: z.string().min(1, "Title is required"),
  amount:z.string().transform(val => Number(val)),
  category: z.string().min(1, "Category is required"),
  date: z.string().optional(),
  notes: z.string().optional()
})

