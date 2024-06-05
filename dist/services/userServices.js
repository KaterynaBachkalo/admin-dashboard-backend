"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configs_1 = __importDefault(require("../configs"));
const models_1 = require("../models");
const utils_1 = require("../utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkUserEmailExists = async (email) => {
    const emailExists = await models_1.User.exists({ email });
    if (emailExists)
        throw new utils_1.HttpError(409, "Email in use");
};
const registration = async (data) => {
    const newUserData = {
        ...data,
        subscription: "starter",
    };
    const newUser = await models_1.User.create(newUserData);
    newUser.password = "";
    return {
        user: newUser,
    };
};
const login = async ({ email, password }) => {
    const user = await models_1.User.findOne({ email }).select("+password");
    if (!user)
        throw new utils_1.HttpError(401, "Email or password is wrong");
    const passwdIsValid = await user.checkPassword(password, user.password);
    if (!passwdIsValid)
        throw new utils_1.HttpError(401, "Email or password is wrong");
    user.password = "";
    const token = jsonwebtoken_1.default.sign({ id: user.id }, configs_1.default.jwtSecret, {
        expiresIn: configs_1.default.jwtExpires,
    });
    await models_1.User.findByIdAndUpdate(user.id, { token });
    return {
        user: { email: user.email, subscription: user.subscription },
        token,
    };
};
exports.default = {
    checkUserEmailExists,
    registration,
    login,
};
//# sourceMappingURL=userServices.js.map