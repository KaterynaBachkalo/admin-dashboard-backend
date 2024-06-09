import { Request, Response } from "express";

import { catchAsync, HttpError, validSchemas } from "../utils";
import { Contact } from "../models";
import { contactServices } from "../services";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  user: { _id: string };
}

const getData = catchAsync(async (req: CustomRequest, res: Response) => {
  const { error } = validSchemas.contactListSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const ownerId = new Schema.Types.ObjectId(req.user._id);

  const { contacts, total } = await contactServices.getContacts(
    req.query,
    ownerId
  );

  res.status(200).json({
    contacts,
    total,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {});

const filterOrders = catchAsync(async (req: Request, res: Response) => {});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {});

const addProduct = catchAsync(async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  const userId = new Schema.Types.ObjectId(_id); // Конвертація _id в ObjectId
  const newContact = await contactServices.createContact(req.body, userId);

  res.status(201).json(newContact);
});

const filterProducts = catchAsync(async (req: Request, res: Response) => {});

const editProduct = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const updateContact = await contactServices.checkOwner(result, req);

  res.status(200).json(updateContact);
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  await contactServices.checkOwner(result, req);

  res.status(200).json({ message: "contact deleted" });
});

const getAllSuppliers = catchAsync(async (req: Request, res: Response) => {});

const addSupplier = catchAsync(async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  const userId = new Schema.Types.ObjectId(_id); // Конвертація _id в ObjectId
  const newContact = await contactServices.createContact(req.body, userId);

  res.status(201).json(newContact);
});

const editSupplier = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { name, email, phone },
    { new: true }
  );
  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const updateContact = await contactServices.checkOwner(result, req);

  res.status(200).json(updateContact);
});

const getAllCustomers = catchAsync(async (req: Request, res: Response) => {});

const getCustomerInfoById = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const contactById = await contactServices.checkOwner(result, req);

  res.status(200).json(contactById);
});

// const updateStatusContact = catchAsync(async (req: Request, res: Response) => {
//   const { contactId } = req.params;
//   const { favorite } = req.body;

//   const result = await Contact.findByIdAndUpdate(
//     contactId,
//     { favorite },
//     { new: true }
//   );

//   if (!result) {
//     throw new HttpError(404, "Not found");
//   }

//   const updateStatus = await contactServices.checkOwner(result, req);

//   res.status(200).json(updateStatus);
// });

export default {
  getData,
  getAllOrders,
  filterOrders,
  getAllProducts,
  addProduct,
  filterProducts,
  editProduct,
  deleteProduct,
  getAllSuppliers,
  addSupplier,
  editSupplier,
  getAllCustomers,
  getCustomerInfoById,
};
