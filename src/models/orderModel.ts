import { model, Schema, Document } from "mongoose";

interface IOrder extends Document {
  photo: string;
  name: string;
  address: string;
  products: string;
  price: string;
  status: string;
  order_date: string;
}

const orderSchema = new Schema<IOrder>(
  {
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
