import express from "express";
import { dashboardControllers } from "../../controllers";
import { contactMiddleware, authMiddleware } from "../../middlewares";

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/dashboard").get(dashboardControllers.getData);

router.route("/orders").get(dashboardControllers.getAllOrders);

router.route("/orders?").get(dashboardControllers.filterOrders);

router
  .route("/products")
  .get(dashboardControllers.getAllProducts)
  .post(dashboardControllers.addProduct);

router
  .route("/products/:productId")
  .put(dashboardControllers.editProduct)
  .delete(dashboardControllers.deleteProduct);

router.route("/products?").get(dashboardControllers.filterProducts);

router
  .route("/suppliers")
  .get(dashboardControllers.getAllSuppliers)
  .post(dashboardControllers.addSupplier);

router.route("/suppliers/:supplierId").put(dashboardControllers.editSupplier);

router.route("/customers").get(dashboardControllers.getAllCustomers);

router
  .route("/customers/:customerId")
  .get(dashboardControllers.getCustomerInfoById);

// .get(contactsControllers.getContacts)
// .post(contactMiddleware.checkAddContact, contactsControllers.addContact);

// router.use("/:contactId", contactMiddleware.checkContactId);
// router.route("/:contactId");
// .get(contactsControllers.getById)
// .delete(contactsControllers.removeContact)
// .put(contactMiddleware.checkUpdateContact, contactsControllers.updateContact);

// router.use(
//   "/:contactId/favorite",
//   contactMiddleware.checkContactId,
//   contactMiddleware.checkStatusContact
// );
// router.route("/:contactId/favorite");
// .patch(contactsControllers.updateStatusContact);

export default router;
