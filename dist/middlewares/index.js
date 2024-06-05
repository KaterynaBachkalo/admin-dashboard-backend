"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.contactMiddleware = void 0;
const contactMiddleware_1 = __importDefault(require("./contactMiddleware"));
exports.contactMiddleware = contactMiddleware_1.default;
const authMiddleware_1 = __importDefault(require("./authMiddleware"));
exports.authMiddleware = authMiddleware_1.default;
//# sourceMappingURL=index.js.map