import fs from "fs/promises";
import path from "path";
import User from "../models";
import { userServices } from "../services";
import { catchAsync, HttpError } from "../utils";
import Jimp from "jimp";
import { Request, Response } from "express";

const registration = catchAsync(async (req: Request, res: Response) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { user, token } = await userServices.login(req.body);

  res.status(200).json({ user, token });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

const getCurrentUser = catchAsync(async (req: Request, res: Response) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
});

const updateSubscription = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;

  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    user: { email: user.email, subscription: user.subscription },
  });
});

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = catchAsync(async (req: Request, res: Response) => {
  const { _id } = req.user;

  if (!req.file) {
    throw new HttpError(400, "Please, upload the image");
  }

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const avatar = await Jimp.read(tempUpload);
  avatar
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
});

export default {
  registration,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
