"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = __importDefault(require("../configs"));
const utils_1 = require("../utils");
const checkToken = (token) => {
    if (!token)
        throw new utils_1.HttpError(401, "Not authorized");
    try {
        const { id } = jsonwebtoken_1.default.verify(token, configs_1.default.jwtSecret);
        return id;
    }
    catch (err) {
        throw new utils_1.HttpError(401, "Not authorized");
    }
};
exports.default = { checkToken };
//# sourceMappingURL=jwtServices.js.map