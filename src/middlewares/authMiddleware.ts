import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { userServices, jwtServices, upload } from "../services";
import { catchAsync, validSchemas, HttpError } from "../utils";

interface CustomRequest extends Request {
  user?: any; // Adjust the type of 'user' as per your User model
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
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

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

const uploadAvatar = upload.single("avatar");

export default {
  checkRegistrationData,
  checkLoginData,
  protect,
  checkSubscriptionExist,
  uploadAvatar,
};
