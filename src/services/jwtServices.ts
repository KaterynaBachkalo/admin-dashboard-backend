import jwt from "jsonwebtoken";
import serverConfig from "../configs";
import { HttpError } from "../utils";

const checkToken = (token: string) => {
  if (!token) throw new HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret) as { id: string };
    console.log(id);

    return id;
  } catch (err) {
    throw new HttpError(401, "Not authorized");
  }
};

export default { checkToken };
