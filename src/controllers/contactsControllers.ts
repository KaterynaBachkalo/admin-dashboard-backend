import { Request, Response } from "express";

import { catchAsync, HttpError, validSchemas } from "../utils";
import Contact from "../models";
import { contactServices } from "../services";

const getById = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const contactById = await contactServices.checkOwner(result, req);

  res.status(200).json(contactById);
});

const addContact = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;
  const newContact = await contactServices.createContact(req.body, _id);

  res.status(201).json(newContact);
});

const removeContact = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  await contactServices.checkOwner(result, req);

  res.status(200).json({ message: "contact deleted" });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {
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

const updateStatusContact = catchAsync(async (req: Request, res: Response) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw new HttpError(404, "Not found");
  }

  const updateStatus = await contactServices.checkOwner(result, req);

  res.status(200).json(updateStatus);
});

const getContacts = catchAsync(async (req: Request, res: Response) => {
  const { error } = validSchemas.contactListSchema.validate(req.query);

  if (error) {
    throw new HttpError(400, error.message);
  }

  const { contacts, total } = await contactServices.getContacts(
    req.query,
    req.user
  );

  res.status(200).json({
    contacts,
    total,
  });
});

export default {
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  getContacts,
};
