import express from "express";
import { getControllers } from "../../controllers";
import { addControllers } from "../../controllers";
import { editControllers } from "../../controllers";
import { deleteControllers } from "../../controllers";

import { authMiddleware, updateMiddleware } from "../../middlewares";

const router = express.Router();

router.use(authMiddleware.protect);

router.route("/dashboard").get(getControllers.getData);

router.route("/orders").get(getControllers.getAllOrders);

router
  .route("/products")
  .get(getControllers.getAllProducts)
  .post(updateMiddleware.checkAddProduct, addControllers.addProduct);

router.use("/products/:productId", updateMiddleware.checkProductId);
router
  .route("/products/:productId")
  .put(updateMiddleware.checkEditProduct, editControllers.editProduct)
  .delete(deleteControllers.deleteProduct);

router
  .route("/suppliers")
  .get(getControllers.getAllSuppliers)
  .post(updateMiddleware.checkAddSupplier, addControllers.addSupplier);

router
  .route("/suppliers/:supplierId")
  .put(
    updateMiddleware.checkSupplierId,
    updateMiddleware.checkEditSupplier,
    editControllers.editSupplier
  );

router.route("/customers").get(getControllers.getAllCustomers);

export default router;
