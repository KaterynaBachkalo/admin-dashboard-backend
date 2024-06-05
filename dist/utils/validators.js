"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addContactSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(20)
        .required()
        .messages({ "any.required": "missing required name field" }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({ "any.required": "missing required email field" }),
    phone: joi_1.default.string()
        .min(3)
        .max(15)
        .required()
        .messages({ "any.required": "missing required phone field" }),
});
const updateStatusSchema = joi_1.default.object({
    favorite: joi_1.default.boolean()
        .required()
        .messages({ "any.required": "missing required favorite field" }),
});
const addUserSchema = joi_1.default.object({
    password: joi_1.default.string().min(6).required().messages({
        "any.required": "Set password for user",
    }),
    email: joi_1.default.string()
        .email()
        .required()
        .messages({ "any.required": "Email is required" }),
});
const updateSubSchema = joi_1.default.object({
    subscription: joi_1.default.string()
        .required()
        .valid("starter", "pro", "business")
        .messages({ msg: "This subscription doesn't exist" }),
});
const contactListSchema = joi_1.default.object({
    limit: joi_1.default.number(),
    page: joi_1.default.number(),
    favorite: joi_1.default.boolean(),
});
exports.default = {
    contactListSchema,
    updateSubSchema,
    addUserSchema,
    updateStatusSchema,
    addContactSchema,
};
//# sourceMappingURL=validators.js.map