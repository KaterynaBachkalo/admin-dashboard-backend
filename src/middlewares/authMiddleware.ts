import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models";
import { userServices, jwtServices } from "../services";
import { catchAsync, validSchemas, HttpError } from "../utils";
import { ObjectId } from "mongodb";

// interface CurrentUser {
//   _id: ObjectId;
//   password: string;
//   email: string;
//   subscription: string;
//   avatarURL: string;
//   token: string;
// }

interface MyCustomRequest extends Request {
  user?: any;
}

const checkRegistrationData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    await userServices.checkUserEmailExists(value.email);

    req.body = value;

    next();
  }
);

const checkLoginData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.addUserSchema.validate(req.body);

    if (error) throw new HttpError(400, error.message);

    req.body = value;

    next();
  }
);

const protect = catchAsync(
  async (req: MyCustomRequest, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    const userId = token && jwtServices.checkToken(token);

    if (!userId) throw new HttpError(401, "Not authorized");

    const currentUser = await User.findById(userId);

    if (!currentUser || !currentUser.token)
      throw new HttpError(401, "Not authorized");

    req.user = currentUser;

    next();
  }
);

const checkSubscriptionExist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = validSchemas.updateSubSchema.validate(req.body);

    if (error) throw new HttpError(400, "Subscription name is not exist");

    req.body = value;

    next();
  }
);

export default {
  checkRegistrationData,
  checkLoginData,
  protect,
  checkSubscriptionExist,
};
