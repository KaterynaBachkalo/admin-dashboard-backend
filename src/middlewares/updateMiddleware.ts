import { Types } from "mongoose";
import { Product, Supplier } from "../models";
import { catchAsync, HttpError, validSchemas } from "../utils";
import { NextFunction, Response, Request } from "express";

const checkAddProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addProductSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) {
      throw new HttpError(400, error.message);
    }

    const productExists = await Product.exists({
      name: value.name,
    });

    if (productExists)
      throw new HttpError(409, "Product with this name already exists..");

    req.body = value;

    next();
  }
);

const checkProductId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const idIsValid = Types.ObjectId.isValid(productId);

    if (!idIsValid) throw new HttpError(404, "Product not found..");

    const productExists = await Product.exists({ _id: productId });

    if (!productExists) throw new HttpError(404, "Product not found..");

    next();
  }
);

const checkEditProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validSchemas.editProductSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) throw new HttpError(400, error.message);

    next();
  }
);

const checkAddSupplier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addSupplierSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) {
      throw new HttpError(400, error.message);
    }

    const supplierExists = await Supplier.exists({
      name: value.name,
    });

    if (supplierExists)
      throw new HttpError(409, "Supplier with this name already exists..");

    req.body = value;

    next();
  }
);

const checkSupplierId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { supplierId } = req.params;

    const idIsValid = Types.ObjectId.isValid(supplierId);

    if (!idIsValid) throw new HttpError(404, "Supplier not found..");

    const productExists = await Supplier.exists({ _id: supplierId });

    if (!productExists) throw new HttpError(404, "Supplier not found..");

    next();
  }
);

const checkEditSupplier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validSchemas.editSupplierSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) throw new HttpError(400, error.message);

    next();
  }
);

export default {
  checkAddProduct,
  checkProductId,
  checkEditProduct,
  checkAddSupplier,
  checkSupplierId,
  checkEditSupplier,
};
