import { Request, Response } from "express";

import { catchAsync, HttpError } from "../utils";
import { Product } from "../models";

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await Product.findByIdAndDelete(productId);
  if (!result) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json({ message: "product deleted" });
});

export default {
  deleteProduct,
};
