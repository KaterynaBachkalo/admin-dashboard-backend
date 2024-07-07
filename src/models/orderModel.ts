import { model, Schema } from "mongoose";
import { IOrder } from "../types";

const orderSchema = new Schema<IOrder>(
  {
    id: { type: Number },

    photo: {
      type: String,
    },
    name: {
      type: String,
    },
    address: {
      type: String,
    },
    products: {
      type: String,
    },
    price: {
      type: String,
    },
    status: {
      type: String,
    },
    order_date: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Order = model<IOrder>("Order", orderSchema);
