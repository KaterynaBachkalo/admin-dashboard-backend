import { User } from "../models";
import { jwtServices, userServices } from "../services";
import { catchAsync } from "../utils";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

interface CustomRequest extends Request {
  user: { _id: ObjectId; email: string };
}

const registration = catchAsync(async (req: CustomRequest, res: Response) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({
    user: { email: user.email },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { user, accessToken, refreshToken } = await userServices.login(
    req.body
  );

  res.status(200).json({ user, accessToken, refreshToken });
});

const logout = catchAsync(async (req: CustomRequest, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

const getCurrentUser = catchAsync(async (req: CustomRequest, res: Response) => {
  const { email } = req.user;

  res.status(200).json({ email });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const result = await jwtServices.refreshToken(token);
    res.json(result);
  } catch (error: any) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default {
  registration,
  login,
  logout,
  getCurrentUser,
  refreshToken,
};
