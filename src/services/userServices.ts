import serverConfig from "../configs";
import User from "../models";
import { HttpError } from "../utils";
import jwt from "jsonwebtoken";

const checkUserEmailExists = async (email: string) => {
  const emailExists = await User.exists(email);

  if (emailExists) throw new HttpError(409, "Email in use");
};

const registration = async (data) => {
  const newUserData = {
    ...data,
    subscription: "starter",
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  return {
    user: newUser,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Email or password is wrong");

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpires,
  });

  await User.findByIdAndUpdate(user.id, { token });

  return {
    user: { email: user.email, subscription: user.subscription },
    token,
  };
};

export default {
  checkUserEmailExists,
  registration,
  login,
};
