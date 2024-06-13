import { model, Schema, Document } from "mongoose";

interface ICustomer extends Document {
  photo: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    spent: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    register_date: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Customer = model<ICustomer>("Customer", customerSchema);
