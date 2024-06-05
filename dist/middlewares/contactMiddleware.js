"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const models_1 = require("../models");
const utils_1 = require("../utils");
const checkAddContact = (0, utils_1.catchAsync)(async (req, res, next) => {
    var _a;
    const { value, error } = utils_1.validSchemas.addContactSchema.validate(req.body);
    if (req.body && Object.keys(req.body).length === 0)
        throw new utils_1.HttpError(400, "missing fields");
    if (error) {
        throw new utils_1.HttpError(400, error.message);
    }
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!userId) {
        throw new utils_1.HttpError(401, "Unauthorized");
    }
    const userExists = await models_1.Contact.exists({
        email: value.email,
        _id: userId,
    });
    if (userExists)
        throw new utils_1.HttpError(409, "User with this email already exists..");
    req.customBody = value;
    next();
});
const checkContactId = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { contactId } = req.params;
    const idIsValid = mongoose_1.Types.ObjectId.isValid(contactId);
    if (!idIsValid)
        throw new utils_1.HttpError(404, "User not found..");
    const userExists = await models_1.Contact.exists({ _id: contactId });
    if (!userExists)
        throw new utils_1.HttpError(404, "User not found..");
    next();
});
const checkUpdateContact = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { error } = utils_1.validSchemas.addContactSchema.validate(req.body);
    if (req.body && Object.keys(req.body).length === 0)
        throw new utils_1.HttpError(400, "missing fields");
    if (error)
        throw new utils_1.HttpError(400, error.message);
    next();
});
const checkStatusContact = (0, utils_1.catchAsync)(async (req, res, next) => {
    const { error } = utils_1.validSchemas.updateStatusSchema.validate(req.body);
    if (req.body && Object.keys(req.body).length === 0)
        throw new utils_1.HttpError(400, "missing field favorite");
    if (error)
        throw new utils_1.HttpError(400, error.message);
    next();
});
exports.default = {
    checkAddContact,
    checkContactId,
    checkUpdateContact,
    checkStatusContact,
};
//# sourceMappingURL=contactMiddleware.js.map