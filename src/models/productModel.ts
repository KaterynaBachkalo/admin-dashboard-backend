import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>(
  {
    id: {
      type: Number,
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
