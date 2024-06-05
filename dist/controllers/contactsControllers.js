"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const models_1 = require("../models");
const services_1 = require("../services");
const mongoose_1 = require("mongoose");
const getById = (0, utils_1.catchAsync)(async (req, res) => {
    const { contactId } = req.params;
    const result = await models_1.Contact.findById(contactId);
    if (!result) {
        throw new utils_1.HttpError(404, "Not found");
    }
    const contactById = await services_1.contactServices.checkOwner(result, req);
    res.status(200).json(contactById);
});
const addContact = (0, utils_1.catchAsync)(async (req, res) => {
    const { _id } = req.user;
    const userId = new mongoose_1.Schema.Types.ObjectId(_id); // Конвертація _id в ObjectId
    const newContact = await services_1.contactServices.createContact(req.body, userId);
    res.status(201).json(newContact);
});
const removeContact = (0, utils_1.catchAsync)(async (req, res) => {
    const { contactId } = req.params;
    const result = await models_1.Contact.findByIdAndDelete(contactId);
    if (!result) {
        throw new utils_1.HttpError(404, "Not found");
    }
    await services_1.contactServices.checkOwner(result, req);
    res.status(200).json({ message: "contact deleted" });
});
const updateContact = (0, utils_1.catchAsync)(async (req, res) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await models_1.Contact.findByIdAndUpdate(contactId, { name, email, phone }, { new: true });
    if (!result) {
        throw new utils_1.HttpError(404, "Not found");
    }
    const updateContact = await services_1.contactServices.checkOwner(result, req);
    res.status(200).json(updateContact);
});
const updateStatusContact = (0, utils_1.catchAsync)(async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await models_1.Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
    if (!result) {
        throw new utils_1.HttpError(404, "Not found");
    }
    const updateStatus = await services_1.contactServices.checkOwner(result, req);
    res.status(200).json(updateStatus);
});
const getContacts = (0, utils_1.catchAsync)(async (req, res) => {
    const { error } = utils_1.validSchemas.contactListSchema.validate(req.query);
    if (error) {
        throw new utils_1.HttpError(400, error.message);
    }
    const ownerId = new mongoose_1.Schema.Types.ObjectId(req.user._id);
    const { contacts, total } = await services_1.contactServices.getContacts(req.query, ownerId);
    res.status(200).json({
        contacts,
        total,
    });
});
exports.default = {
    getById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
    getContacts,
};
//# sourceMappingURL=contactsControllers.js.map