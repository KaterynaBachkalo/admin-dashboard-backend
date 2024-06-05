import { Types } from "mongoose";
import { Contact } from "../models";
import { catchAsync, HttpError, validSchemas } from "../utils";
import { NextFunction } from "express";

interface CustomRequest extends Request {
  user: { _id: string; email: string; subscription: string };
  params: { contactId: string };
  customBody?: any;
}

const checkAddContact = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addContactSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) {
      throw new HttpError(400, error.message);
    }

    const userId = req.user?._id;

    if (!userId) {
      throw new HttpError(401, "Unauthorized");
    }

    const userExists = await Contact.exists({
      email: value.email,
      _id: userId,
    });

    if (userExists)
      throw new HttpError(409, "User with this email already exists..");

    req.customBody = value;

    next();
  }
);

const checkContactId = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { contactId } = req.params;

    const idIsValid = Types.ObjectId.isValid(contactId);

    if (!idIsValid) throw new HttpError(404, "User not found..");

    const userExists = await Contact.exists({ _id: contactId });

    if (!userExists) throw new HttpError(404, "User not found..");

    next();
  }
);

const checkUpdateContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validSchemas.addContactSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing fields");

    if (error) throw new HttpError(400, error.message);

    next();
  }
);

const checkStatusContact = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = validSchemas.updateStatusSchema.validate(req.body);

    if (req.body && Object.keys(req.body).length === 0)
      throw new HttpError(400, "missing field favorite");

    if (error) throw new HttpError(400, error.message);

    next();
  }
);

export default {
  checkAddContact,
  checkContactId,
  checkUpdateContact,
  checkStatusContact,
};
