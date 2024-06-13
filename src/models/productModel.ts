import { model, Schema, Document } from "mongoose";

interface IProduct extends Document {
  id: string;
  photo: string;
  name: string;
  suppliers: string;
  stock: string;
  price: string;
  category: string;
}

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    photo: {
      type: String,
    },
    suppliers: {
      type: String,
    },
    stock: {
      type: String,
    },
    price: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const Product = model<IProduct>("Product", productSchema);
