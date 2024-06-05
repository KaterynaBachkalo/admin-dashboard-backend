"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
const jimp_1 = __importDefault(require("jimp"));
const registration = (0, utils_1.catchAsync)(async (req, res) => {
    const { user } = await services_1.userServices.registration(req.body);
    res.status(201).json({
        user: { email: user.email, subscription: user.subscription },
    });
});
const login = (0, utils_1.catchAsync)(async (req, res) => {
    const { user, token } = await services_1.userServices.login(req.body);
    res.status(200).json({ user, token });
});
const logout = (0, utils_1.catchAsync)(async (req, res) => {
    const { _id } = req.user;
    await models_1.User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
});
const getCurrentUser = (0, utils_1.catchAsync)(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
});
const updateSubscription = (0, utils_1.catchAsync)(async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const user = await models_1.User.findByIdAndUpdate(_id, { subscription }, { new: true });
    res.status(200).json({
        user: { email: user === null || user === void 0 ? void 0 : user.email, subscription: user === null || user === void 0 ? void 0 : user.subscription },
    });
});
const avatarDir = path_1.default.join(__dirname, "../", "public", "avatars");
const updateAvatar = (0, utils_1.catchAsync)(async (req, res) => {
    const { _id } = req.user;
    if (!req.file) {
        throw new utils_1.HttpError(400, "Please, upload the image");
    }
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path_1.default.join(avatarDir, filename);
    const avatar = await jimp_1.default.read(tempUpload);
    avatar
        .cover(250, 250, jimp_1.default.HORIZONTAL_ALIGN_CENTER | jimp_1.default.VERTICAL_ALIGN_MIDDLE)
        .writeAsync(tempUpload);
    await promises_1.default.rename(tempUpload, resultUpload);
    const avatarURL = path_1.default.join("avatars", filename);
    await models_1.User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({
        avatarURL,
    });
});
exports.default = {
    registration,
    login,
    logout,
    getCurrentUser,
    updateSubscription,
    updateAvatar,
};
//# sourceMappingURL=authControllers.js.map