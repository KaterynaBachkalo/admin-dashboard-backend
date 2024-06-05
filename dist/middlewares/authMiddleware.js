"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const services_1 = require("../services");
const utils_1 = require("../utils");
const checkRegistrationData = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { value, error } = utils_1.validSchemas.addUserSchema.validate(req.body);
    if (error)
        throw new utils_1.HttpError(400, error.message);
    await services_1.userServices.checkUserEmailExists(value.email);
    req.body = value;
    next();
});
const checkLoginData = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { value, error } = utils_1.validSchemas.addUserSchema.validate(req.body);
    if (error)
        throw new utils_1.HttpError(400, error.message);
    req.body = value;
    next();
});
const protect = (0, utils_1.catchAsync)(async (req, res, next) => {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer ")) &&
        req.headers.authorization.split(" ")[1];
    const userId = token && services_1.jwtServices.checkToken(token);
    if (!userId)
        throw new utils_1.HttpError(401, "Not authorized");
    const currentUser = await models_1.User.findById(userId);
    if (!currentUser || !currentUser.token)
        throw new utils_1.HttpError(401, "Not authorized");
    req.user = currentUser;
    next();
});
const checkSubscriptionExist = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { value, error } = utils_1.validSchemas.updateSubSchema.validate(req.body);
    if (error)
        throw new utils_1.HttpError(400, "Subscription name is not exist");
    req.body = value;
    next();
});
const uploadAvatar = services_1.upload.single("avatar");
exports.default = {
    checkRegistrationData,
    checkLoginData,
    protect,
    checkSubscriptionExist,
    uploadAvatar,
};
//# sourceMappingURL=authMiddleware.js.map