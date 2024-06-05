"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
const router = express_1.default.Router();
router.use(middlewares_1.authMiddleware.protect);
router
    .route("/")
    .get(controllers_1.contactsControllers.getContacts)
    .post(middlewares_1.contactMiddleware.checkAddContact, controllers_1.contactsControllers.addContact);
router.use("/:contactId", middlewares_1.contactMiddleware.checkContactId);
router
    .route("/:contactId")
    .get(controllers_1.contactsControllers.getById)
    .delete(controllers_1.contactsControllers.removeContact)
    .put(middlewares_1.contactMiddleware.checkUpdateContact, controllers_1.contactsControllers.updateContact);
router.use("/:contactId/favorite", middlewares_1.contactMiddleware.checkContactId, middlewares_1.contactMiddleware.checkStatusContact);
router
    .route("/:contactId/favorite")
    .patch(controllers_1.contactsControllers.updateStatusContact);
exports.default = router;
//# sourceMappingURL=contactsRouter.js.map