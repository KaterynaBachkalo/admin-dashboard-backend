import express from "express";
import { contactsControllers } from "../../controllers";
import { contactMiddleware, authMiddleware } from "../../middlewares";

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route("/")
  .get(contactsControllers.getContacts)
  .post(contactMiddleware.checkAddContact, contactsControllers.addContact);

router.use("/:contactId", contactMiddleware.checkContactId);
router
  .route("/:contactId")
  .get(contactsControllers.getById)
  .delete(contactsControllers.removeContact)
  .put(contactMiddleware.checkUpdateContact, contactsControllers.updateContact);

router.use(
  "/:contactId/favorite",
  contactMiddleware.checkContactId,
  contactMiddleware.checkStatusContact
);
router
  .route("/:contactId/favorite")
  .patch(contactsControllers.updateStatusContact);

export default router;
