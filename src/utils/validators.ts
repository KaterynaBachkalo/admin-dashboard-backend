import Joi from "joi";

const addProductSchema = Joi.object({
  id: Joi.string(),

  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),

  category: Joi.string()
    .required()
    .messages({ "any.required": "missing required category field" }),

  suppliers: Joi.string()
    .required()
    .messages({ "any.required": "missing required suppliers field" }),

  stock: Joi.string()
    .required()
    .messages({ "any.required": "missing required stock field" }),

  price: Joi.string()
    .required()
    .messages({ "any.required": "missing required price field" }),
});

const editProductSchema = Joi.object({
  _id: Joi.string().required(),

  id: Joi.string().required(),

  photo: Joi.string(),

  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),

  category: Joi.string()
    .required()
    .messages({ "any.required": "missing required category field" }),

  suppliers: Joi.string()
    .required()
    .messages({ "any.required": "missing required suppliers field" }),

  stock: Joi.string()
    .required()
    .messages({ "any.required": "missing required stock field" }),

  price: Joi.string()
    .required()
    .messages({ "any.required": "missing required price field" }),
});

const addSupplierSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),

  address: Joi.string()
    .required()
    .messages({ "any.required": "missing required address field" }),

  suppliers: Joi.string()
    .required()
    .messages({ "any.required": "missing required suppliers field" }),

  date: Joi.string()
    .required()
    .messages({ "any.required": "missing required date field" }),

  amount: Joi.string()
    .required()
    .messages({ "any.required": "missing required amount field" }),

  status: Joi.string()
    .required()
    .messages({ "any.required": "missing required status field" }),
});

const editSupplierSchema = Joi.object({
  _id: Joi.string().required(),

  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),

  address: Joi.string()
    .required()
    .messages({ "any.required": "missing required address field" }),

  suppliers: Joi.string()
    .required()
    .messages({ "any.required": "missing required suppliers field" }),

  date: Joi.string()
    .required()
    .messages({ "any.required": "missing required date field" }),

  amount: Joi.string()
    .required()
    .messages({ "any.required": "missing required amount field" }),

  status: Joi.string()
    .required()
    .messages({ "any.required": "missing required status field" }),
});

const addUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Set password for user",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
});

const orderSchema = Joi.object({
  limit: Joi.number(),

  page: Joi.number(),

  name: Joi.string(),
});

const productSchema = Joi.object({
  limit: Joi.number(),

  page: Joi.number(),

  name: Joi.string(),
});

const supplierSchema = Joi.object({
  limit: Joi.number(),

  page: Joi.number(),

  name: Joi.string(),
});

const customerSchema = Joi.object({
  limit: Joi.number(),

  page: Joi.number(),

  name: Joi.string(),
});

export default {
  orderSchema,
  addUserSchema,
  addProductSchema,
  editProductSchema,
  addSupplierSchema,
  editSupplierSchema,
  productSchema,
  supplierSchema,
  customerSchema,
};
