"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const utils_1 = require("../utils");
const createContact = (contactData, owner) => {
    return models_1.Contact.create({
        ...contactData,
        owner,
    });
};
const getContacts = async (query, owner) => {
    // SEARCH FEATURE =====================================
    const findOptions = {};
    if (query.favorite !== undefined) {
        findOptions.favorite = query.favorite;
    }
    findOptions.owner = owner;
    // INIT DB QUERY ================================
    const contactsQuery = models_1.Contact.find(findOptions).populate({
        path: "owner",
        select: "_id",
    });
    // PAGINATION FEATURE =============================
    const limit = 20;
    const paginationPage = query.page ? +query.page : 1;
    const paginationLimit = query.limit ? +query.limit : limit;
    const docsToSkip = (paginationPage - 1) * paginationLimit;
    contactsQuery.skip(docsToSkip).limit(paginationLimit);
    const contacts = await contactsQuery;
    const total = await models_1.Contact.countDocuments(findOptions);
    return {
        contacts,
        total,
    };
};
const checkOwner = async (result, req) => {
    const ownerId = result.owner.valueOf();
    const currentId = req.user._id.valueOf();
    if (ownerId !== currentId) {
        throw new utils_1.HttpError(404, "Not found");
    }
    return result;
};
exports.default = {
    createContact,
    getContacts,
    checkOwner,
};
//# sourceMappingURL=contactServices.js.map