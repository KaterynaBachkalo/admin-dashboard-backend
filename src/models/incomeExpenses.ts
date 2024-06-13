import { model, Schema, Document } from "mongoose";

interface IIncomeExpense extends Document {
  name: string;
  amount: string;
  type: string;
}

const incomeExpensesSchema = new Schema<IIncomeExpense>(
  {
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
