import { Request, Response } from "express";

import { catchAsync, HttpError } from "../utils";
import { Product, Supplier } from "../models";

const editProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { name, category, suppliers, stock, price } = req.body;

  const result = await Product.findByIdAndUpdate(
    productId,
    { name, category, suppliers, stock, price },
    { new: true }
  );

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(result);
});

const editSupplier = catchAsync(async (req: Request, res: Response) => {
  const { supplierId } = req.params;
  const { name, address, suppliers, date, amount, status } = req.body;
  const result = await Supplier.findByIdAndUpdate(
    supplierId,
    { name, address, suppliers, date, amount, status },
    { new: true }
  );
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(result);
});

export default {
  editProduct,
  editSupplier,
};
