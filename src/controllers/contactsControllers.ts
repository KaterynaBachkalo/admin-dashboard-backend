import { Request, RequestHandler, Response } from "express";

import { catchAsync, HttpError, validSchemas } from "../utils";
import { Contact } from "../models";
import { contactServices } from "../services";
import { Schema } from "mongoose";

interface CustomRequest extends Request {
  user: { _id: string };
}

const getById: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId);

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    const contactById = await contactServices.checkOwner(result, req);

    res.status(200).json(contactById);
  }
);

const addContact: RequestHandler = catchAsync(
  async (req: CustomRequest, res: Response) => {
    const { _id } = req.user;

    const userId = new Schema.Types.ObjectId(_id); // Конвертація _id в ObjectId
    const newContact = await contactServices.createContact(req.body, userId);

    res.status(201).json(newContact);
  }
);

const removeContact: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
      throw new HttpError(404, "Not found");
    }

    await contactServices.checkOwner(result, req);

    res.status(200).json({ message: "contact deleted" });
  }
);

const updateContact: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

const updateStatusContact: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

const getContacts: RequestHandler = catchAsync(
  async (req: CustomRequest, res: Response) => {
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
  }
);

export default {
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
  getContacts,
};
