import { model, Schema, Document } from "mongoose";
import { IIncomeExpense } from "../types";

const incomeExpensesSchema = new Schema<IIncomeExpense>(
  {
    id: { type: Number },

    name: {
      type: String,
    },
    amount: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Incomeexpense = model<IIncomeExpense>(
  "Incomeexpense",
  incomeExpensesSchema
);
