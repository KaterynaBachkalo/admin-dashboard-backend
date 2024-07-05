import { Request, Response } from "express";

import { catchAsync, HttpError } from "../utils";
import { Product, Supplier } from "../models";

const editProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { ...updateProduct } = req.body;

  const result = await Product.findByIdAndUpdate(productId, updateProduct, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

const editSupplier = catchAsync(async (req: Request, res: Response) => {
  const { supplierId } = req.params;
  const { _id, ...updateSupplier } = req.body;

  const result = await Supplier.findByIdAndUpdate(supplierId, updateSupplier, {
    new: true,
  });
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

export default {
  editProduct,
  editSupplier,
};
