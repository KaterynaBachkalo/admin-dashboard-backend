import { model, Schema, Document } from "mongoose";

interface ISupplier extends Document {
  name: string;
  address: string;
  suppliers: string;
  date: string;
  amount: string;
  status: string;
}

const supplierSchema = new Schema<ISupplier>(
  {
    id: {
      type: String,
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
