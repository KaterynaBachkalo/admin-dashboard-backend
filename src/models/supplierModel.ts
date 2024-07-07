import { model, Schema } from "mongoose";
import { ISupplier } from "../types";

const supplierSchema = new Schema<ISupplier>(
  {
    id: {
      type: Number,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    date: {
      type: String,
    },
    amount: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Supplier = model<ISupplier>("Supplier", supplierSchema);
