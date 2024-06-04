import Contact from "../models";
import { HttpError } from "../utils";

const createContact = (contactData, owner) => {
  return Contact.create({
    ...contactData,
    owner,
  });
};

const getContacts = async (query, owner) => {
  // SEARCH FEATURE =====================================

  const findOptions = query.favorite
    ? {
        favorite: query.favorite,
      }
    : {};

  findOptions.owner = owner;

  // INIT DB QUERY ================================
  const contactsQuery = Contact.find(findOptions).populate({
    path: "owner",
    select: "_id",
  });

  // PAGINATION FEATURE =============================
  const limit = 20;

  const paginationPage = query.page ? +query.page : 1;
  const paginationLimit = query.limit ? +query.limit : `${limit}`;
  const docsToSkip = (paginationPage - 1) * paginationLimit;

  contactsQuery.skip(docsToSkip).limit(paginationLimit);

  const contacts = await contactsQuery;

  const total = await Contact.countDocuments(findOptions);

  return {
    contacts,
    total,
  };
};

const checkOwner = async (result, req) => {
  const ownerId = result.owner.valueOf();
  const currentId = req.user._id.valueOf();

  if (ownerId !== currentId) {
    throw new HttpError(404, "Not found");
  }

  return result;
};

export default {
  createContact,
  getContacts,
  checkOwner,
};
