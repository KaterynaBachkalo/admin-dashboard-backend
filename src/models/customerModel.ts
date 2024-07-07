import { model, Schema, Document } from "mongoose";
import { ICustomer } from "../types";

const customerSchema = new Schema<ICustomer>(
  {
    id: { type: Number },

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
