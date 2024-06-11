import Joi from "joi";

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ "any.required": "missing required name field" }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),

  phone: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
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

const contactListSchema = Joi.object({
  limit: Joi.number(),

  page: Joi.number(),

  favorite: Joi.boolean(),
});

export default {
  contactListSchema,
  addUserSchema,
  addContactSchema,
};
