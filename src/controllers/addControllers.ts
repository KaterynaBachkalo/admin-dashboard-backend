import { Request, Response } from "express";

import { catchAsync } from "../utils";
import { adminServices } from "../services";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = await adminServices.createProduct(req.body);
  res.status(201).json(newProduct);
});

const addSupplier = catchAsync(async (req: Request, res: Response) => {
  const newSupplier = await adminServices.createSupplier(req.body);
  res.status(201).json(newSupplier);
});

export default {
  addProduct,
  addSupplier,
};
