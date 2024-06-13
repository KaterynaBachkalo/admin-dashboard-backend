import { Request, Response } from "express";

import { catchAsync, HttpError, validSchemas } from "../utils";
import { adminServices } from "../services";

interface CustomRequest extends Request {
  user: { _id: string };
}

const getData = catchAsync(async (req: CustomRequest, res: Response) => {
  const {
    products,
    totalProducts,
    customers,
    totalCustomers,
    suppliers,
    totalSuppliers,
    incomeExpenses,
  } = await adminServices.getData(req.query);

  res.status(200).json({
    products,
    totalProducts,
    customers,
    totalCustomers,
    suppliers,
    totalSuppliers,
    incomeExpenses,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const { error } = validSchemas.orderSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { orders, total } = await adminServices.getOrders(req.query);

  res.status(200).json({
    orders,
    total,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const { error } = validSchemas.productSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { products, total } = await adminServices.getProducts(req.query);

  res.status(200).json({
    products,
    total,
  });
});

const getAllSuppliers = catchAsync(async (req: Request, res: Response) => {
  const { error } = validSchemas.supplierSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { suppliers, total } = await adminServices.getSuppliers(req.query);

  res.status(200).json({
    suppliers,
    total,
  });
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {
  const { error } = validSchemas.customerSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { customers, total } = await adminServices.getCustomers(req.query);

  res.status(200).json({
    customers,
    total,
  });
});

const getCustomerInfoById = catchAsync(async (req: Request, res: Response) => {
  // const { contactId } = req.params;
  // const result = await Contact.findById(contactId);
  // if (!result) {
  //   throw new HttpError(404, "Not found");
  // }
  // const contactById = await contactServices.checkOwner(result, req);
  // res.status(200).json(contactById);
});

export default {
  getData,
  getAllOrders,
  getAllProducts,
  getAllSuppliers,
  getAllCustomers,
  getCustomerInfoById,
};
