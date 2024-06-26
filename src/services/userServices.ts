import serverConfig from "../configs";
import { User } from "../models";
import { HttpError } from "../utils";
import jwt from "jsonwebtoken";

interface registrationData {
  userData: {
    email: string;
    password: string | undefined;
  };
}

interface LoginParams {
  email: string;
  password: string;
}

const checkUserEmailExists = async (email: string) => {
  const emailExists = await User.exists({ email });

  if (emailExists) throw new HttpError(409, "Email in use");
};

const registration = async (data: registrationData) => {
  const newUserData = {
    ...data,
  };

  const newUser = await User.create(newUserData);

  newUser.password = "";

  return {
    user: newUser,
  };
};

const login = async ({ email, password }: LoginParams) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Email or password is wrong");

  user.password = "";

  const accessToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn:
      process.env.NODE_ENV === "production" ? "120m" : serverConfig.jwtExpires,
  });

  const refreshToken = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: process.env.NODE_ENV === "production" ? "7d" : "1d",
  });

  await User.findByIdAndUpdate(user.id, { accessToken, refreshToken });

  return {
    user: { email: user.email },
    accessToken,
    refreshToken,
  };
};

export default {
  checkUserEmailExists,
  registration,
  login,
};
